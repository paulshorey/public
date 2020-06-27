import React from "react"
import Layout from "../components/Page"
import EditWord from "src/containers/Admin/EditWord"

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <EditWord location={this.props.location} />
      </Layout>
    )
  }
}

export default RootIndex
