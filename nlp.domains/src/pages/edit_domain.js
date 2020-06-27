import React from "react"
import Layout from "../components/Page"
import EditDomain from "src/containers/Admin/EditDomain"

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <EditDomain location={this.props.location} />
      </Layout>
    )
  }
}

export default RootIndex
