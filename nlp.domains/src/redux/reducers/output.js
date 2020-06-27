import all_tlds from "data/domains/all"
import { obj_is_empty } from "universal-common-scripts/functions/objects"

function get_ss(key, default_value) {
  return default_value
  // let ss_value = window.sessionStorage.getItem(key);
  // // console.log('got from ss:', key, ss_value);
  // return (
  //   ss_value
  //     ? JSON.parse(ss_value)
  //     : default_value
  // );
}

function set_ss(key, value) {
  // window.sessionStorage.setItem(key, JSON.stringify(value));
}

/*
  1) CONFIG - DEFAULT STATE:
*/
const defState = {
  suggestions_domains: {},
  word_hacks: [],
  suggestions_wip_domains: [],
  suggestions_phrases: [],
  suggestions_phrase_lists: [],
  suggestions_availability: get_ss("suggestions_availability", {}),
  tlds_all: all_tlds,
  tlds_user: get_ss("tlds_user", {}),
  tlds_checked: {}, //get_ss('tlds_checked', {}),
  tlds_unchecked: {},
  tlds_extra: {},
  hide_available: false,
  hide_premium: true,
  hide_unavailable: true,
  hide_other: true
}

/*
  2) REDUCE STATE:
*/
const ThisReducer = (state = defState, action) => {
  const newState = { ...state }

  /*
    3) HANDLE ACTIONS:
  */
  switch (action.type) {
    /*
     * Results
     */
    case "RX__results_toggle_list":
      if (action.listType && newState.hasOwnProperty("hide_" + action.listType)) {
        newState["hide_" + action.listType] = !newState["hide_" + action.listType]
      }
      break

    /*
     * Suggestions
     */
    case "RX__domain_suggestions":
      let results = action.results || {}
      let phrase = newState.input_str
      let tld = newState.input_tld

      /*
       * add back-end content
       */
      newState.suggestions_domains = results.domains || {}
      newState.suggestions_phrases = results.phrases || []
      newState.word_hacks = results.word_hacks || []
      newState.suggestions_phrase_lists = results.phrase_lists || []

      /*
       * use custom Front-End suggestions, if no backend suggestions exist yet
       */
      if (phrase && tld) {
        let fe_original_suggestions = []
        let phrase_clean = phrase.replace(/[^\w\d-_.]+/g, "")
        fe_original_suggestions.push(phrase_clean + "." + tld)
        let ntldi = 0
        for (let ntld in all_tlds) {
          // add few top tlds immediately, without waiting for API
          if (tld !== ntld) fe_original_suggestions.push(phrase_clean + "." + ntld)
          // next
          ntldi++
          if (ntldi > 7) break
        }
        // add, if no backend suggestions exist yet
        if (!newState.suggestions_domains["original"] || !newState.suggestions_domains["original"].length) {
          newState.suggestions_domains["original"] = fe_original_suggestions
        }
      }

      break

    case "RX__domain_suggestions_availability":
      if (action.data) {
        // reset
        newState.suggestions_availability = { ...newState.suggestions_availability }
        // set
        for (let key in action.data) {
          newState.suggestions_availability[key] = action.data[key]
        }
        // persist
        set_ss("suggestions_availability", newState.suggestions_availability)
      }
      break

    /*
     * Tlds
     */

    /**
     * @action.data {array} - Note: receive Array from BE, but save to FE as Object
     */
    case "RX__tlds_checked":
      if (action.data) {
        /*
         * reset - dump all into unchecked
         * clear all old extensions
         */
        newState.tlds_checked = {}
        /*
         * set user/checked/unchecked
         */
        for (let tld of action.data) {
          if (!newState.tlds_user[tld]) {
            newState.tlds_checked[tld] = true
          }
        }
        /*
         * persist
         */
        set_ss("tlds_checked", newState.tlds_checked)
      }
      break

    /**
     * @action.data {array} - Dump same as received, from response
     */
    case "RX__tlds_extra":
      if (action.data) {
        newState.tlds_extra = action.data
      }
      break

    /**
     * @action.data {string}
     */
    case "RX__tld_user":
      if (action.data) {
        // add
        newState.tlds_user = { [action.data]: true } //{ ...{ [action.data]: true }, ...newState.tlds_user }
        // remove
        delete newState.tlds_checked[action.data]
        delete newState.tlds_unchecked[action.data]
        // persist
        set_ss("tlds_user", newState.tlds_user)
        set_ss("tlds_checked", newState.tlds_checked)
      }
      break

    /**
     * @action.data {string}
     */
    case "RX__tld_check":
      if (action.data) {
        // remove
        delete newState.tlds_unchecked[action.data]
        // add
        newState.tlds_checked = { ...{ [action.data]: true }, ...newState.tlds_checked }
        // persist
        set_ss("tlds_user", newState.tlds_user)
        set_ss("tlds_checked", newState.tlds_checked)
      }
      break

    /**
     * @action.data {string}
     */
    case "RX__tld_uncheck":
      // add
      newState.tlds_unchecked = { ...{ [action.data]: true }, ...newState.tlds_unchecked }
      // remove
      delete newState.tlds_user[action.data]
      delete newState.tlds_checked[action.data]
      // make sure not to remove the last tld from lists
      if (obj_is_empty(newState.tlds_user) && obj_is_empty(newState.tlds_checked)) {
        // fix
        // {...tlds_user, ...tlds_checked} must have at least one value
        newState.tlds_checked = { ...{ [action.data]: true }, ...newState.tlds_checked }
        // remove from unchecked
        delete newState.tlds_unchecked[action.data]
      }
      // persist
      set_ss("tlds_user", newState.tlds_user)
      set_ss("tlds_checked", newState.tlds_checked)
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
