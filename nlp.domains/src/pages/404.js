import React from "react"
import Layout from "../components/Page"

// import NotFound from 'src/containers/NotFound'

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <p>Page Not Found</p>
      </Layout>
    )
  }
}

export default RootIndex
