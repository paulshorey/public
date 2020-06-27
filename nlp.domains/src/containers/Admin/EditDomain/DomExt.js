import React from "react"
import { Link } from "gatsby"

class DomExt extends React.Component {
  render() {
    if (!this.props.domext) {
      return null
    }
    return (
      <span>
        {/*
         * word
         */}
        <span className={"posword"}>
          <Link
            to={`/edit_domain?tld=${this.props.domext}`}
            onClick={() => {
              window.isLoading("render")
            }}
          >
            {this.props.domext},&nbsp;
          </Link>
        </span>
      </span>
    )
  }
}

export default DomExt
