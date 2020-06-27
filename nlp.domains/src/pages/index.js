import React from "react"
import Domain from "src/pages/domain"
import Word from "src/pages/word"
import Home from "src/pages/home"

class RootIndex extends React.Component {
  render() {
    if (typeof window === "undefined") {
      return <Home location={this.props.location} />
    } else if (window.location.hostname.includes("thesaurus") || this.props.location.search.includes("thesaurus")) {
      return <Word location={this.props.location} />
    } else {
      return <Domain location={this.props.location} />
    }
  }
}

export default RootIndex
