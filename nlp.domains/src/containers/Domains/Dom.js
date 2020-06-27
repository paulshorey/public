import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faHeart, faSyncAlt, faDollarSign, faCalendarExclamation } from "@fortawesome/pro-regular-svg-icons"

const Dom = ({ that, phraseString }) => {
  let { suggestions_availability, input_tld, input_str, input_spellchecked } = that.props
  let phraseStringNoSpaces = phraseString.replace(/ /g, "")
  let isExact =
    phraseStringNoSpaces === input_str.replace(/ /g, "") + "." + input_tld ||
    phraseStringNoSpaces === input_spellchecked.replace(/ /g, "") + " ." + input_tld
  let code = Number(suggestions_availability[phraseString.replace(/ /g, "")] || 0)
  //
  // unknown
  let status = "unknown"
  let Icon = <FA key={status} icon={faSyncAlt} />
  //
  // available
  if (code === 1) {
    status = "available"
    Icon = <FA icon={faHeart} className="faHeart" />
  }
  // other
  if (code > 1 && code < 10) {
    status = "other"
    Icon = <span className="textQuestion">??</span>
  }
  // unavailable
  if (code >= 10) {
    status = "unavailable"
    Icon = <span className="textQuestion">?</span>
  }
  // premium
  if (code >= 100) {
    status = "premium"
    Icon = [
      <FA key={1} icon={faDollarSign} className="faDollarSign" />,
      <span key={2}>
        {code !== 101 ? (
          <span className="price">{Math.round(code).toLocaleString()}</span>
        ) : (
          <FA key={1} icon={faDollarSign} className="faDollarSign" />
        )}
      </span>
    ]
  }
  // expiring
  if (code >= 1000000) {
    status = "expiring"
    Icon = <FA key={1} icon={faCalendarExclamation} />
  }
  return (
    <div className={`dom_name status-${status} ${isExact ? "status-exact" : ""}`}>
      <div className={"dom_card"}>
        <span>
          {phraseString.split(" ").map((str, i) => (
            <span key={str + i} className="word">
              {str}
            </span>
          ))}
        </span>
        &nbsp;&nbsp;
        <span className="icon">{Icon}</span>
      </div>
    </div>
  )
}

Dom.propTypes = {
  that: PropTypes.object, // passed down from root container
  phraseString: PropTypes.string // domain string suggestion to show, with spaces
}

export default Dom
