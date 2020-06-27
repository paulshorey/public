// import { RX__toggle_poss } from "./ui"
import { domain_suggestions } from "src/redux/actions/api/v1"
// const PRODUCTION = process.env.GATSBY_ACTIVE_ENV === 'production'

/*
 * input
 */
export function RX__clear_inputs() {
  return (dispatch) => {
    console.log("clear inputs")
    dispatch({
      type: "RX__word_clear_inputs",
      data: ""
    })
  }
}
export function RX__get_domains(data) {
  return (dispatch) => {
    dispatch({
      type: "RX__get_domains",
      data: data
    })
  }
}

export function RX__search_options(new_options) {
  console.warn("RX__search_options() called with ", new_options)
  return async (dispatch) => {
    let { input } = getState()
    /*
     * set option
     */
    dispatch({
      type: "RX__search_options",
      data: new_options
    })
    /*
     * re-search
     */
    dispatch(
      RX__word_phrase({ get_domains: true, options: new_options, phrase: input.input_str, tld: input.input_tld })
    )
  }
}

/*
 * search
 */
let RX__get_data__in_progress = false
export function RX__get_data(params = {}) {
  // debounce
  RX__get_data__in_progress = true
  // options
  let { options = {}, captcha_response = "", get_domains = false, phrase = "", tld = "" } = params
  return async (dispatch, getState) => {
    /*
     * get domain suggestions? set earlier by the `src/containers` module (page)
     */
    let { input } = getState()
    if (input.get_domains) {
      console.log("get_domains is true")
      get_domains = true
    }
    /*
     * prevent duplicate calls
     */
    if (input.search_in_progress) {
      return
    }
    dispatch({
      type: "RX__search_in_progress",
      data: true
    })
    if (!tld && get_domains) {
      tld = "com"
    } else if (tld === "com" && !get_domains) {
      tld = ""
    }
    // set new tld immediately, before waiting for results
    // to avoid duplicate call, and change to search results page
    if (tld) {
      dispatch({
        type: "RX__word_input_tld",
        data: tld
      })
    }
    // set new str immediately, before waiting for results
    // to avoid duplicate call, and change to search results page
    dispatch({
      type: "RX__word_input_str",
      data: phrase
    })
    // clear spellchecked
    dispatch({
      type: "RX__word_input_spellchecked",
      data: ""
    })
    // clear suggestions
    dispatch({
      type: "RX__domain_suggestions",
      results: {
        domains: {},
        wip_domains: [],
        phrases: [],
        word_hacks: [],
        phrase_lists: []
      }
    })

    /*
     * Get new data
     */
    if (!phrase) {
      /*
       * CLEAR ALL
       */
      dispatch({ type: "RX__clear_all" })
    } else {
      /*
       * POST DATA
       */
      let data = {
        phrase: phrase,
        captcha_response: captcha_response,
        options: {},
        tlds_use: [tld],
        tlds_ignore: []
      }
      // user options (sort, grouping, word hacks, poetic, etc.)
      // ok to pass incomplete options - defaults will be gotten from store
      data.options = { ...input.search_options, ...options }
      // what data to return:
      if (get_domains) {
        data._domains = true
      }

      // REQUEST
      let results = (await dispatch(domain_suggestions(data))) || {}
      // finished
      dispatch({
        type: "RX__search_in_progress",
        data: false
      })

      // always set tld, even if already specified,
      // because this one is parsed from the query phrase.
      // parsed value overrides value specified by dropdown
      dispatch({
        type: "RX__word_input_tld",
        data: results.tld
      })

      // phrase - spellchecked
      dispatch({
        type: "RX__word_input_spellchecked",
        data: results.string
      })

      // data
      dispatch({
        type: "RX__tld_user",
        data: results.tld || tld
      })

      dispatch({
        type: "RX__word_chunks",
        data: results.chunks_rows
      })

      dispatch({
        type: "RX__word_tld_chunk",
        data: results.tld_row
      })

      dispatch({
        type: "RX__domain_suggestions",
        results: {
          domains: results.domains,
          wip_domains: results.wip_domains,
          phrases: results.phrases,
          phrase_lists: results.phrase_lists,
          word_hacks: results.word_hacks
        }
      })
      dispatch({
        type: "RX__tlds_checked",
        data: results.tlds
      })
      dispatch({
        type: "RX__tlds_extra",
        data: results.tlds_extra
      })
    }

    /*
     * done - allow function to run again in future
     */
    RX__get_data__in_progress = false
  }
}
