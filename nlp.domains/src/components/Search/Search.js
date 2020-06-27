/*
 * This component manages two variables: ${word} and ${tld}.
 *
 * LOCAL STATE (user input)    temporary - when changes, do nothing
 * GLOBAL STATE                read only - if changes, do nothing
 * URL PARAMS                  when changes, sync to local/global
 * USER SUBMIT OR SELECT       sync local state to global/url
 */
import React, { createRef } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as ui_actions from "src/redux/actions/ui"
import * as input_actions from "src/redux/actions/input"
import * as output_actions from "src/redux/actions/output"
import { Button, Input } from "antd"
import { Styled } from "./Search.styled"
import InputTld from "src/components/Search/InputTld"
import WordPoss from "../WordPoss"
import PropTypes from "prop-types"
import { object_from_querystring } from "universal-common-scripts/functions/urls"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import Recaptcha from "react-google-invisible-recaptcha"
import { faSearch } from "@fortawesome/pro-solid-svg-icons"
import Header from "../Header"

/*
 * CAPTCHA:
 *
 * in production, wait for captcha success, or abort fetching data
 * in development, query data immediately
 */
console.log("process.env.GATSBY_ACTIVE_ENV", process.env.GATSBY_ACTIVE_ENV)
const USE_CAPTCHA = process.env.GATSBY_ACTIVE_ENV !== "development"

/*
 * LIFECYCLE:
 *
 * constructor() --- page loaded, parse state from url or redux initial state
 * componentDidMount() --- :focus input field, fetch data
 * componentDidUpdate() --- respond to URL change (back button, navigate to home)
 * input_state()
 * --- validates 2 arguments (word, tld), sets default, parses tld from word,
 * --- then calls captcha_challenge()
 * captcha_challenge()
 * --- in production, waits for captcha success
 * --- then calls persist_state()
 * persist_state()
 * --- syncs local state to global/url
 */
class Search extends React.Component {
  constructor(props) {
    super(props)
    /*
     * default values
     */
    let url_obj = object_from_querystring(props.location.search)
    console.log("constructor", url_obj)
    this.state = {
      word: url_obj.str || "",
      tld: url_obj.tld || Object.keys(props.tlds_user)[0] || Object.keys(props.tlds_checked)[0] || ""
    }
    /*
     * dom manipulation
     */
    this.Input_ref = createRef()
  }

  focusInput() {
    if (this.Input_ref.current) {
      this.Input_ref.current.focus()
    }
  }

  componentDidMount() {
    /*
     * :focus this input field, from outside this component
     */
    this.focusInput()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /*
     * url state -> local state
     */
    if (this.props.location.search !== prevProps.location.search) {
      let word = this.state.word
      let tld = this.state.tld
      let url_obj = object_from_querystring(this.props.location.search)
      if (url_obj.str) {
        word = url_obj.str
      }
      if (url_obj.tld) {
        tld = url_obj.tld
      }
      if (word) {
        console.log(`componentDidMount() set input_state ${word}, ${tld}`, this.props.location.search)
        this.input_state(word, tld)
      }
    }
    // /*
    //  * sync local state with global state
    //  * (if user clicks something, to change state from outside this component)
    //  */
    // if (this.props.input_str !== prevProps.input_str) {
    //   if (this.props.input_str !== this.state.input_str) {
    //     this.setState({ word: this.props.input_str })
    //   }
    // }
    // if (this.props.input_tld !== prevProps.input_tld) {
    //   if (this.props.input_tld !== this.state.input_tld) {
    //     this.setState({ tld: this.props.input_tld })
    //   }
    // }
  }

  input_state = (word = "", tld = "") => {
    // default
    if (word === null) {
      word = this.state.word
    }
    if (tld === null) {
      tld = this.state.tld
    }

    // validate
    word = word.trim()
    tld = tld.trim()

    // no value
    if (!tld && !word) {
      return
    }

    // new tld
    if (tld && tld !== this.props.input_tld) {
      this.props.output_actions.RX__tld_add(tld, "user")
    }

    // if url contains ".", parse TLD from input string
    if (word) {
      let doti = word.indexOf(".")
      if (doti !== -1) {
        // parse tld
        tld = word.substr(doti + 1).trim()
        // fix input
        word = word.substr(0, doti)
      }
    }

    // set state
    let newState = { word, tld }

    // then, get data
    this.setState(newState, this.captcha_challenge)
  }

  captcha_challenge = () => {
    if (!this.state.word) {
      console.log("! this.state.word ! - dont save, dont do captcha")
      return
    }
    console.log("captcha_challenge()")
    /*
     * captcha.execute() will call this.persist_state()
     * if challenge is successful
     */
    if (USE_CAPTCHA) {
      console.log("this.recaptcha", this.recaptcha)
      if (this.recaptcha && this.recaptcha.execute) {
        console.log("this.recaptcha.execute()...")
        this.recaptcha.execute()
      }
    } else {
      /*
       * local (development) environment bypass captcha
       */
      this.persist_state()
    }
  }

  persist_state = () => {
    /*
     * validate captcha
     */
    let captcha_response = ""
    // local server not check captcha_response value
    if (USE_CAPTCHA) {
      console.log("this.recaptcha.getResponse()...")
      captcha_response = this.recaptcha.getResponse()
      this.recaptcha.reset()
    }

    /*
     * set redux
     */
    if (this.props.input_str !== this.state.word || this.props.input_tld !== this.state.tld) {
      let phrase_params = {
        phrase: this.state.word,
        tld: this.state.tld,
        captcha_response,
        get_domains: this.props.domains
      }
      console.log("phrase_params", phrase_params)
      this.props.input_actions.RX__get_data(phrase_params)
    }
  }

  render() {
    let {
      home,
      loading,
      location,
      title,
      title_nav,
      placeholder,
      cue,
      cue_nav,
      hideInput,
      domains,
      className,
      autofocus,
      ...props
    } = this.props
    return (
      <>
        {/*
         * Header
         */}
        <Header location={location} home={!!home} loading={!!loading} />

        {/*
         * Search banner
         */}
        <Styled
          className={"Search " + className}
          onMouseEnter={() => {
            if (autofocus) this.focusInput()
          }}
        >
          <div className="content">
            {/*
             * Title
             * If mobile, show only last line (last item in array)!
             */}
            {!!title && (
              <h1 className="title">
                {title}
                <div className="title_nav">{title_nav}</div>
              </h1>
            )}

            {/*
             * Input Group
             */}
            <div className={"input-group"}>
              {!hideInput ? (
                <Input
                  ref={this.Input_ref}
                  className="Input"
                  placeholder={placeholder || "enter a few words or a phrase..."}
                  value={this.state.word}
                  onChange={(event) => {
                    this.setState({
                      word: event.target.value
                    })
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      this.input_state(this.state.word, null)
                    }
                  }}
                  onBlur={() => {
                    if (this.props.input_str && !this.state.word) {
                      this.setState({
                        word: this.props.input_str
                      })
                    }
                  }}
                />
              ) : (
                <span className="input-padding" />
              )}
              {!!domains && (
                <InputTld
                  value={this.props.input_tld || "com"}
                  placeholder=""
                  handleSelect={(value) => {
                    console.log("Search.js handleSelect", value)
                    this.input_state(null, value)
                  }}
                />
              )}
              <Button
                className="Button"
                onClick={() => {
                  this.input_state(this.state.word, null)
                }}
              >
                {/*<b className="hide-small">search&thinsp;&thinsp;</b>*/}
                <FA icon={faSearch} className="faSearch" style={{ transform: "scale(0.85)" }} />
              </Button>
            </div>

            {/*
             * Cue message
             */}
            {(!!cue || !!cue_nav) && (
              <div className="cue_container">
                {!!cue && <span className="cue">{cue}</span>}
                {!!cue_nav && <span className="cue_nav">{cue_nav}</span>}
              </div>
            )}
          </div>

          {/*
           * Recaptcha
           */}
          {USE_CAPTCHA && (
            <Recaptcha
              ref={(ref) => (this.recaptcha = ref)}
              sitekey="6LeQt-MUAAAAAFHZGwmJnd58aStK2xF-6f8MBtm3"
              onLoaded={this.captcha_challenge}
              onResolved={this.persist_state}
              onError={(err) => {
                console.error("Captcha error", err)
              }}
              onExpired={(err) => {
                console.error("Captcha expired", err)
              }}
            />
          )}

          {/*
           * POSS content, below Search form
           */}
          {!!domains && !home && <WordPoss {...props} />}
        </Styled>
      </>
    )
  }
}

/*******************************************************************************************************
 * this.props DOCUMENTATION
 *******************************************************************************************************/

const mapDispatchToProps = (dispatch) => {
  return {
    output_actions: bindActionCreators(output_actions, dispatch),
    input_actions: bindActionCreators(input_actions, dispatch),
    ui_actions: bindActionCreators(ui_actions, dispatch)
  }
}

const mapStateToProps = function (state) {
  return {
    search_options: state.input.search_options, // bool
    show_poss: state.ui.show_poss, // bool
    input_str: state.input.input_str, // string
    chunks: state.input.chunks, // array of DB rows, about input_str
    input_tld: state.input.input_tld, // string
    tlds_user: state.output.tlds_user, // dict of tlds
    tlds_checked: state.output.tlds_checked // dict of tlds
  }
}

Search.propTypes = {
  domains: PropTypes.bool, // if true, this component will manage .tld in url (if false, will omit .tld from url)
  location: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
