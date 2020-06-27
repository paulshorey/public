import React from "react"
import Layout from "../components/Page"
import Search from "../components/Search"

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <Search
          {...this.props}
          className={"Search SearchHome"}
          domains={false}
          title=""
          placeholder=""
          home={true}
          cue={[<div key="1"> </div>]}
          loading={true}
        />
        <p className="content"> </p>
      </Layout>
    )
  }
}

export default RootIndex
