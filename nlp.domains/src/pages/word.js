import React from "react"
import Layout from "../components/Page"
import Word from "src/containers/Word"

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Word location={this.props.location} />
      </Layout>
    )
  }
}

export default RootIndex
