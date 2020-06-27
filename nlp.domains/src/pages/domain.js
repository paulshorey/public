import React from "react"
import Layout from "../components/Page"
import Domains from "src/containers/Domains"

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Domains location={this.props.location} />
      </Layout>
    )
  }
}

export default RootIndex
