import React from "react"
import Layout from "../components/Page"
import Header from "../components/Header"

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Header location={this.props.location} standalone={true} />
        <p className="content">Compare...</p>
      </Layout>
    )
  }
}

export default RootIndex
