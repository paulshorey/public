import { object_from_querystring, querystring_from_object } from "universal-common-scripts/functions/urls"
import { navigate } from "gatsby"

function set_window_title_location({ str = "", tld = "" }) {
  /*
   * set title
   */
  window.document.title = str.replace(/ /g, " ") + (tld ? " ." + tld : "")
  /*
   * set url
   */
  // /{page_name}?str={str}&tld={tld}
  let obj = {}
  if (str) {
    obj.str = str
  }
  if (tld) {
    obj.tld = tld
  }
  let search = querystring_from_object(obj)
  let href = window.location.pathname + search
  if (search && href !== window.location.href) {
    navigate(href)
  }
}

// const uri_obj = function(){
//   // usage:
//   // let {word, tld} = uri_obj();
//   let obj = object_from_querystring(this.props.location.search)
//   let word = decodeURIComponent(obj.word || "").trim()
//   let tld = decodeURIComponent(obj.tld || "").trim()
//   return [word, tld]
// }

/*
  1) CONFIG - DEFAULT STATE:
*/
const initialState = {
  get_domains: false,
  input_spellchecked: "",
  input_first_word: "",
  input_str: "",
  input_tld: "",
  input: "", // UNUSED?, simple string, user-entered, will be parsed into chunks/tld_chunk
  chunks: {}, // dictionary of word DB rows: { key: { key: '', poss: {} } }
  tld_chunk: undefined, // word DB row: { key: '', poss: {} }
  search_options: {
    length_vs_relevance: 5,
    ext_suggestions_num: 12,
    group_by: "name",
    use_domain_hacks: true,
    use_word_hacks: true,
    use_synonyms: true,
    use_before_after: true
  }, // dump {key:value} options into here - will be passed to search API
  search_in_progress: false
}

/*
  2) REDUCE STATE:
*/
const ThisReducer = (state = initialState, action) => {
  let newState = { ...state }

  /*
    3) HANDLE ACTIONS:
  */
  switch (action.type) {
    /*
     * Input (query)
     */
    case "RX__clear_all":
      newState = { ...initialState }
      break

    case "RX__get_domains":
      newState.get_domains = action.data
      break

    case "RX__search_in_progress":
      newState.search_in_progress = !!action.data
      break

    case "RX__word_clear_inputs":
      {
        // URL
        console.log("RX__word_clear_inputs", { str: "", tld: "" })
        set_window_title_location({})
        // state
        newState.input_tld = initialState.input_tld
        newState.input_str = ""
        newState.input_spellchecked = ""
        newState.input_first_word = ""
      }
      break

    case "RX__word_input_tld":
      {
        // state
        newState.input_tld = action.data || initialState.input_tld
        // URL
        let url_obj = object_from_querystring(window.location.search)
        url_obj.tld = newState.input_tld
        console.log("RX__word_input_tld", url_obj)
        set_window_title_location(url_obj)
      }
      break

    case "RX__word_input_str":
      {
        // state
        if (action.data) {
          action.data = action.data.replace(/[^\w\d ]+/g, "")
          newState.input_str = action.data || initialState.input_str
        } else {
          newState.input_str = ""
          newState.input_spellchecked = ""
          newState.input_first_word = ""
        }
        // first word
        if (newState.input_str && !newState.input_first_word) {
          let i_space = newState.input_str.indexOf(" ")
          if (i_space !== -1) {
            newState.input_first_word = newState.input_str.substring(0, i_space)
          }
        }
        // URL
        let url_obj = object_from_querystring(window.location.search)
        url_obj.str = newState.input_str
        console.log("RX__word_input_str", url_obj)
        set_window_title_location(url_obj)
      }
      break

    case "RX__word_input_spellchecked":
      if (action.data) {
        action.data = action.data.replace(/[^\w\d ]+/g, "")
        newState.input_spellchecked = action.data || initialState.input_spellchecked
      } else {
        newState.input_spellchecked = ""
      }
      break

    case "RX__word_input":
      newState.input = action.data || initialState.input
      break

    case "RX__word_chunks":
      newState.chunks = action.data || initialState.chunks
      for (let key in newState.chunks) {
        let row = newState.chunks[key]
        if (row && row.list_count >= 10) {
          newState.input_first_word = key
        } else if (!newState.input_first_word) {
          newState.input_first_word = key
        }
      }
      break

    case "RX__word_tld_chunk":
      newState.tld_chunk = action.data || initialState.tld_chunk
      break

    case "RX__search_options":
      console.error("                       REDUCER RECEIVED            ", action)
      if (action.data) {
        for (let key in action.data) {
          newState.search_options[key] = action.data[key]
        }
      } else {
        newState.search_options = initialState.search_options
      }
      break
  }
  /*
    4) RETURN (COPY OF) STATE:
  */
  // console.log(
  //   [action.type, action],
  //   JSON.parse(JSON.stringify(newState)),
  // )
  return newState
}

export default ThisReducer
