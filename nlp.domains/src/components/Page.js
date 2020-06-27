import React from "react"
import { StyledApp } from "./Page.styled.js"
import { Helmet } from "react-helmet"

class Template extends React.Component {
  render() {
    const { children } = this.props
    return (
      <StyledApp>
        <Helmet>
          <meta charSet="utf-8" />
          {/*<title>...</title>*/}
          <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width" />
        </Helmet>

        {children}
      </StyledApp>
    )
  }
}

export default Template
