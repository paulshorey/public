import React from "react"
import { connect } from "react-redux"
import { Link } from "gatsby"
import { StyledHeadContainer, StyledHeader, StyledHead, StyledRightburger, StyledLogoContainer } from "./Header.styled"
import { Dropdown, Menu } from "antd"
import { faBars } from "@fortawesome/pro-regular-svg-icons"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { bindActionCreators } from "redux"
import * as output_actions from "../../redux/actions/output"
import * as input_actions from "../../redux/actions/input"
import * as ui_actions from "../../redux/actions/ui"

const isThesaurus = function () {
  return typeof window !== "undefined" && window.location.hostname.includes("thesaurus")
}

class AccountMenu extends React.Component {
  render() {
    // view
    return (
      <Menu className={"MenuDropdownHeaderRight"}>
        {/*
         * Nav dropdown
         */}
        <Menu.Item>
          <Link to={isThesaurus() ? "/domain" + this.props.location.search : "https://nlp.domains"}>
            <h6>Domain Suggestions</h6>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to={isThesaurus() ? "/word?word=" + this.props.input_first_word : "https://nlpthesaurus.com"}>
            <h6>Thesaurus</h6>
          </Link>
        </Menu.Item>
        <hr />
        <Menu.Item className="small">
          <Link to={"/contact"}>
            <h6>about us</h6>
          </Link>
        </Menu.Item>
        <hr />
        <Menu.Item className="small subdued">
          <Link to={"/edit_word?word=" + this.props.input_first_word}>
            <h6>
              edit word <sup>(demo)</sup>
            </h6>
          </Link>
        </Menu.Item>
        <Menu.Item className="small subdued">
          <Link to={"/edit_domain?tld=" + this.props.input_tld || ""}>
            <h6>
              edit domain <sup>(demo)</sup>
            </h6>
          </Link>
        </Menu.Item>
      </Menu>
    )
  }
}

class ThisComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logoIndex: 0,
      logosLength: 6,
      logoText: ""
    }
  }

  updateLogoIndex = (newIndex) => {
    if (typeof index === "undefined") {
      let length = this.state.logosLength
      newIndex = this.state.logoIndex + 1
      if (newIndex >= length) {
        newIndex = newIndex - length
      }
    }
    this.setState({
      logoIndex: newIndex
    })
  }

  updateLogoText = () => {
    let pathlist = this.props.location.pathname.split("/")
    this.setState({
      logoText: pathlist[1]
    })
  }

  componentDidMount() {
    this.updateLogoText()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.updateLogoText()
    }
  }

  render() {
    let { home, loading, standalone } = this.props
    /*
     *  Nlp.Domains
     */
    let Logo = (
      <Link className="clickable" to="/">
        {/*<span className="vmiddle color-accent" style={{ marginLeft: '1px' }}>best</span>*/}
        <span className="vmiddle color-subtle-light" style={{ marginLeft: "0.1rem" }}>
          NLP
        </span>
        <span className="vmiddle color-accent" style={{ marginLeft: "0.1rem" }}>
          .Domains
        </span>
      </Link>
    )
    if (loading) {
      /*
       *  SSR (before window is available)
       */
      Logo = (
        <Link className="clickable" to="/">
          <span className="vmiddle color-accent" style={{ marginLeft: "0.1rem" }}>
            NLP
          </span>
        </Link>
      )
    } else if (typeof window !== "undefined" && window.location.hostname.includes("thesaurus")) {
      /*
       *  NlpThesaurus.com
       */
      Logo = (
        <Link className="clickable" to="/">
          <span className="vmiddle color-accent" style={{ marginLeft: "0.1rem" }}>
            NLP
          </span>
          <span className="vmiddle color-subtle-light" style={{ marginLeft: "0.1rem" }}>
            Thesaurus
          </span>
          <span className="vmiddle color-accent" style={{ marginLeft: "0.1rem" }}>
            .com
          </span>
        </Link>
      )
    }

    return (
      <StyledHeadContainer className={standalone ? "wrapInContainer" : ""}>
        <StyledHead className="StyledHead" style={{ position: home ? "fixed" : "absolute" }}>
          <StyledHeader className="StyledHeader content">
            {/*
             * Logo
             */}
            <StyledLogoContainer>
              <h2
                className="StyledLogo"
                onClick={() => {
                  this.updateLogoIndex()
                }}
              >
                {Logo}
              </h2>
            </StyledLogoContainer>

            {/*
             * Hamburger Menu
             */}
            <StyledRightburger className="StyledRightburger">
              <Dropdown className="Dropdown" overlay={<AccountMenu {...this.props} />}>
                <FA icon={faBars} className="faBars" />
              </Dropdown>
            </StyledRightburger>
          </StyledHeader>
        </StyledHead>
      </StyledHeadContainer>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    output_actions: bindActionCreators(output_actions, dispatch),
    input_actions: bindActionCreators(input_actions, dispatch),
    ui_actions: bindActionCreators(ui_actions, dispatch)
  }
}
const mapStateToProps = function (state) {
  return {
    input_str: state.input.input_str,
    input_tld: state.input.input_tld,
    input_first_word: state.input.input_first_word
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ThisComponent)
