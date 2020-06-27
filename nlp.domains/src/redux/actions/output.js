import { data_domains_availability } from "src/redux/actions/api/v1"
const sleep = function (ms = 0) {
  return new Promise((r) => setTimeout(r, ms))
}

/*
 * Show/hide "available/premium/unavailable/other" domain suggestions:
 */
export function RX__results_toggle_list(listType = "") {
  if (listType) {
    return {
      type: "RX__results_toggle_list",
      listType: listType
    }
  }
}

/*
 * ADD TLD (or remove tld, by "adding" it to "unchecked" list)
 * This is called on RX__word_chunks API response, also from Tlds.js
 */
export function RX__tld_add(tld = "", list_name = "unchecked") {
  return async (dispatch, getState) => {
    // validate
    let { tlds_all } = getState().output
    if (!tlds_all[tld]) return
    // unshift to list_name tlds_user/tlds_checked/tlds_unchecked...
    // but, because action "tlds_checked" means something else,
    // convert to verb: tlds_check/uncheck ("tlds_user" stays unchanged)
    let action = list_name
    if (action.substr(-2) === "ed") {
      action = action.substring(0, action.length - 2)
    }
    dispatch({
      type: "RX__tld_" + action,
      data: tld
    })
  }
}

export function RX__domain_suggestions_availability() {
  return async (dispatch, getState) => {
    let { input, output } = getState()
    let { suggestions_availability, suggestions_domains = {} } = output
    /*
     * Make flat list of domain names to POST
     */
    let suggestions = []
    // add original
    suggestions.push(input.input_str + "." + input.input_tld)
    // loop each group, then add each item inside to flat suggestions list:
    for (let name in suggestions_domains) {
      let list = suggestions_domains[name]
      if (list && list.length) {
        // loop each item, to add:
        for (let item of list) {
          suggestions.push(item)
        }
      }
    }
    // remove spaces
    suggestions = suggestions.map((word) => word.replace(/ /g, ""))
    // keep only ones which don't already have availability score
    suggestions = suggestions.filter((word) => {
      return (
        !suggestions_availability[word] || suggestions_availability[word] == 0 || suggestions_availability[word] == -1
      )
    })
    /*
     * Fetch availability of each suggestion string
     * (100 at a time)
     */
    if (suggestions.length) {
      let i_page = 0
      let n_page = 5
      while (i_page * n_page < suggestions.length) {
        let start = i_page * n_page
        n_page += i_page * 10 // increase by 10 every time
        let end = i_page * n_page + n_page
        let suggestions_slice = suggestions.slice(start, end)
        if (suggestions_slice.length) {
          dispatch(data_domains_availability(suggestions_slice)).then((data) => {
            if (data && typeof data === "object") {
              // save
              dispatch({
                type: "RX__domain_suggestions_availability",
                data: data
              })
            }
          })
          await sleep(1)
        }
        i_page++
      }
    }
  }
}
