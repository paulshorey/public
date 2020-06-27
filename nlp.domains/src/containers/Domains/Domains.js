import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as ui_actions from "src/redux/actions/ui"
import * as input_actions from "src/redux/actions/input"
import * as output_actions from "src/redux/actions/output"
import DomainsResults from "./DomainsResults"
import DomainsHome from "./DomainsHome"
import { loadScript } from "universal-common-scripts/functions/requests"
import { AboutUs, ContactPopup } from "../../contact.styled"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/pro-light-svg-icons"

const styles = {
  ___: {
    margin: "0 -0.09rem"
  },
  __: {
    margin: "0 -0.11rem"
  },
  _: {
    margin: "0 -0.14rem"
  }
}
export const ___ = () => <span style={styles.___}> </span>
export const __ = () => <span style={styles.__}> </span>
export const _ = () => <span style={styles._}> </span>

class Domains extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tldAdd: "",
      showWip: false,
      showOptions: false,
      popupActive: false
    }
  }

  componentDidMount() {
    this.props.input_actions.RX__get_domains(true)
    /*
     * Contact popup
     */
    loadScript("/scripts/powr.js")
  }

  async componentDidUpdate(prevProps) {
    /*
     * New suggestions_domains ... get suggestions_availability
     */
    if (this.props.suggestions_domains !== prevProps.suggestions_domains) {
      this.props.output_actions.RX__domain_suggestions_availability()
    }
  }

  toggleResults = (listType) => {
    this.props.output_actions.RX__results_toggle_list(listType)
  }
  toggleWip = () => {
    this.setState({
      showWip: !this.state.showWip
    })
  }
  toggleOptions = () => {
    this.setState({
      showOptions: !this.state.showOptions
    })
  }
  tld_user = (tld) => {
    this.props.output_actions.RX__tld_add(tld, "user")
  }
  tld_check = (tld) => {
    this.props.output_actions.RX__tld_add(tld, "checked")
  }
  tld_uncheck = (tld) => {
    this.props.output_actions.RX__tld_add(tld, "unchecked")
  }

  render() {
    // console.log("Domains.js suggestions_availability", this.props.suggestions_availability)
    return (
      <>
        {this.props.input_str ? (
          <DomainsResults className="DomainsResults" that={this} />
        ) : (
          <DomainsHome className="DomainsHome" that={this} />
        )}
        {/*
         * Contact popup
         */}
        <ContactPopup className={this.state.popupActive ? "active" : "hidden"}>
          <div className="powr-contact-form" id="26cc3624_1592768408" />
          <div
            className="x"
            onClick={() => {
              this.setState({ popupActive: false })
            }}
          >
            <FA icon={faTimes} className="faTimes" />
          </div>
        </ContactPopup>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ui_actions: bindActionCreators(ui_actions, dispatch),
    output_actions: bindActionCreators(output_actions, dispatch),
    input_actions: bindActionCreators(input_actions, dispatch)
  }
}

const mapStateToProps = function (state) {
  return {
    // ui
    show_poss: state.ui.show_poss,
    // word
    search_options: state.input.search_options,
    word_chunks: state.input.chunks,
    word_input: state.input.input,
    input_str: state.input.input_str,
    input_spellchecked: state.input.input_spellchecked,
    input_tld: state.input.input_tld,
    // results
    hide_available: state.output.hide_available,
    hide_unavailable: state.output.hide_unavailable,
    hide_other: state.output.hide_other,
    hide_premium: state.output.hide_premium,
    // tlds
    tlds_all: state.output.tlds_all,
    tlds_user: state.output.tlds_user,
    tlds_checked: state.output.tlds_checked,
    tlds_unchecked: state.output.tlds_unchecked,
    tlds_extra: state.output.tlds_extra,
    // suggestions
    suggestions_availability: state.output.suggestions_availability,
    suggestions_domains: state.output.suggestions_domains,
    word_hacks: state.output.word_hacks,
    suggestions_phrase_lists: state.output.suggestions_phrase_lists
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Domains)
