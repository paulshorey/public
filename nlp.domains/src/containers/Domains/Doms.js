import React from "react"
import PropTypes from "prop-types"
import { faCaretDown } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { DomsStyled } from "./Doms.styled"
import Dom from "./Dom"
import { H5Styled } from "./Domains.styled"
import { asort_by_rating_and_position } from "universal-common-scripts/functions/asort_strings"
import { astrings_shuffle_first_last } from "universal-common-scripts/functions/astrings"

let list_title = function (listname) {
  if (listname === "original") {
    return "Exact Name + Related Extensions"
  }
  if (!listname) {
    return "Available Name Suggestions"
  }
  return listname
}
let list_limit = function (listname, available) {
  // defaults for each category
  let limit = 9
  if (listname === "original") {
    limit = 9
  } else if (!listname) {
    limit = 99
  }
  // show all available
  limit = Math.max(limit, available)
  /*
   * adjust to screen size
   */
  if (typeof window !== "undefined") {
    // round up to fill 3 columns
    if (window.innerWidth > 1299) {
      if (limit % 3) {
        limit += 3 - (limit % 3)
      }
    }
    // round up to fill 2 columns
    else if (window.innerWidth > 999) {
      if (limit % 2) {
        limit += 2 - (limit % 2)
      }
    }
  }
  // word hacks
  if (listname === "word hacks") {
    limit = 0
  }
  // done
  return limit
}

class Doms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // ['unlimit_'+listname]: {boolean}
      hide_unchecked: false,
      suggestions_domains: props.that.suggestions_domains
    }
  }

  componentDidUpdate() {
    let that = this.props.that
    if (that.props.suggestions_domains !== this.state.suggestions_domains) {
      this.setState({
        hide_unchecked: false,
        suggestions_domains: that.props.suggestions_domains
      })
    }
  }

  render() {
    /*
     * User "container" state/props/methods!
     * This "child" component is to simplify container's render() logic.
     */
    let that = this.props.that
    let { suggestions_domains, suggestions_availability, tlds_user, tlds_checked } = that.props

    /*
     * validate
     */
    if (!suggestions_domains || !Object.keys(suggestions_domains).length) {
      return (
        <DomsStyled className="DomsStyled">
          <div className="content">
            <p>&nbsp;</p>
            <p>loading results......</p>
          </div>
        </DomsStyled>
      )
    }
    let ListNames = []
    let Lists = []
    let doms_displayed = 0

    /*
     * filter each list
     */
    for (let listname in suggestions_domains) {
      let list = suggestions_domains[listname]
      if (!list.length) continue
      let ListAvailable = []
      let ListPremium = []
      let ListUnavailable = []
      let tlds_ratings = {}
      let tlds_checked_arr = Object.keys(tlds_checked)
      /*
       * List
       * for each item (phrase string) in list (category of suggestions)
       * fill appropriate list with phrase strings:
       */
      for (let i = 0; i < list.length; i++) {
        let phraseString = list[i]
        let code = Number(suggestions_availability[phraseString.replace(/ /g, "")] || 0)
        /*
         * Rate
         */
        let tld = phraseString.substr(phraseString.indexOf(".") + 1)
        //
        if (tlds_user[tld]) {
          // user-specified tld is best (give highest score)
          tlds_ratings[phraseString] = 1000
        } else {
          // inverse of tld position in tld suggestions (higher number = better)
          let tld_arr_i = tlds_checked_arr.indexOf(tld) + 1
          if (tld_arr_i) {
            // exponential curve: prefer first tld much more than second, much more than third
            let rating = tlds_checked_arr.length - tld_arr_i
            tlds_ratings[phraseString] = rating * rating
          } else {
            // not found (domain hack = lowest score)
            tlds_ratings[phraseString] = 0
          }
        }
        /*
         * ListAvailable
         */
        // show available
        if (code === 1 && !that.props.hide_available) {
          ListAvailable.push(phraseString)
          doms_displayed++
        }
        // show other
        else if (code > 1 && code < 10 && !that.props.hide_other) {
          ListUnavailable.push(phraseString)
          doms_displayed++
        }
        // show unavailable
        else if (code === 10 && !that.props.hide_unavailable) {
          ListUnavailable.push(phraseString)
          doms_displayed++
        }
        // show premium
        else if (code > 10 && code < 1000000 && !that.props.hide_premium) {
          ListPremium.push(phraseString)
          doms_displayed++
        }
        // show expiring soon
        else if (code > 1000000 && !that.props.hide_expiring) {
          ListPremium.push(phraseString)
          doms_displayed++
        }
        // show unknown
        else if (code === 0) {
          ListUnavailable.push(phraseString)
          doms_displayed++
        }
      }
      /*
       * shuffle lists - to avoid the same extension or first word showing multiple times in a row
       */
      ListAvailable = astrings_shuffle_first_last(ListAvailable)
      ListPremium = astrings_shuffle_first_last(ListPremium)
      ListUnavailable = astrings_shuffle_first_last(ListUnavailable)
      /*
       * sort each list - best TLDs to front
       */
      ListAvailable = asort_by_rating_and_position(ListAvailable, tlds_ratings, 10)
      ListPremium = asort_by_rating_and_position(ListPremium, tlds_ratings, 10)
      ListUnavailable = asort_by_rating_and_position(ListUnavailable, tlds_ratings, 10)
      /*
       * shuffle lists - to avoid the same extension or first word showing multiple times in a row
       */
      ListAvailable = astrings_shuffle_first_last(ListAvailable)
      ListPremium = astrings_shuffle_first_last(ListPremium)
      ListUnavailable = astrings_shuffle_first_last(ListUnavailable)
      /*
       * save list content
       */
      Lists.push([ListAvailable, ListPremium, ListUnavailable])
      ListNames.push(listname)
    }

    /*
     * Not enough items?
     * enable one at a time - component will re-render - then check again!
     */
    let enabled_one = false
    if (doms_displayed < 9 && !enabled_one && that.props.hide_available) {
      console.log("doms_displayed < 9, enablig available")
      that.toggleResults("available")
      enabled_one = true
    }
    if (doms_displayed < 9 && !enabled_one && that.props.hide_premium) {
      that.toggleResults("premium")
      console.log("doms_displayed < 9, enablig premium")
      enabled_one = true
    }
    if (doms_displayed < 9 && !enabled_one && that.props.hide_unavailable) {
      that.toggleResults("unavailable")
      console.log("doms_displayed < 9, enablig unavailable")
      enabled_one = true
    }
    if (doms_displayed < 9 && !enabled_one && that.props.hide_other) {
      that.toggleResults("other")
      console.log("doms_displayed < 9, enablig other")
      enabled_one = true
    }

    /*
     * List carry-over
     * When first (original phrase) list is limited,
     * some good results maybe hidden. I'd like to feature these results,
     * so, just move them to the next list, but to the middle of it!
     */
    let ListCarryover = []

    /*
     * View
     */
    return (
      <DomsStyled className="DomsStyled">
        {Lists.map(([ListAvailable, ListPremium, ListUnavailable], li) => {
          let listname = ListNames[li]
          let limit = list_limit(listname, ListAvailable.length + ListPremium.length)
          let label = list_title(listname)
          /*
           * Combine lists
           */
          let ListAll = [...ListAvailable, ...ListPremium, ...ListUnavailable]
          /*
           * Mix in previous (carry-over) list content
           * !!! only into the last list, the one with no name
           */
          if (ListCarryover.length && !listname) {
            for (let i = 0; i < ListCarryover.length; i++) {
              // every 3,4,5 items, insert a carryover item
              let freq = 3 + (i % 3)
              ListAll.splice(i * freq + 3, 0, ListCarryover[i])
            }
          }
          /*
           * Limit number of results
           * Show full list if user clicked to expand it,
           * or limit the list items to maximum number.
           */
          let ListLimited = []
          if (this.state["unlimit_" + listname]) {
            // show full list if Legend.js checkbox is clicked
            ListLimited = ListAll
          } else {
            // limit the list items to maximum number, if checkbox is unchecked
            ListLimited = ListAll.slice(0, limit)
            // but also, throw remaining items into overflow "carryover" list
            // only carry-over "available" items! available list is always first,
            // so, check if the available list was cut off, and use that
            if (ListAvailable.length > limit) {
              ListCarryover = [...ListCarryover, ...ListAvailable.slice(limit)]
            }
          }

          /*
           * view
           */
          return ListLimited.length ? (
            <div key={li} className="doms_group">
              <H5Styled className="doms_title">{label}</H5Styled>
              <div className="doms_content">
                {/*
                 * Results
                 */}
                {ListLimited.map((phraseString, pi) => (
                  <Dom that={that} key={pi} phraseString={phraseString} />
                ))}
                {/*
                 * Link to "show more"
                 */}
                {ListAll.length > ListLimited.length && (
                  <div className="dom_name unlimit">
                    <span
                      onClick={() => {
                        this.setState({
                          ["unlimit_" + listname]: true
                        })
                      }}
                    >
                      show more &thinsp;
                      <FA className="fa-angle-down" icon={faCaretDown} />
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : null
        })}
      </DomsStyled>
    )
  }
}

Doms.propTypes = {
  suggestions_domains: PropTypes.object,
  suggestions_availability: PropTypes.object
}

export default Doms
