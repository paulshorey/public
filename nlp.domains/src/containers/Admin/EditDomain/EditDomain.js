import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as input_actions from "src/redux/actions/input"
import * as ui_actions from "src/redux/actions/ui"
import api_actions from "src/redux/actions/api"
import { StyledPage, StyledSearch } from "../../../components/Page.styled"
import Search from "../../../components/Search"
import EditDomainResults from "./EditDomainResults"
// import WordPoss from "../../../components/WordPoss"

class EditDomain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      synsDict: {},
      dom: {},
      all_domains: []
    }
  }

  submit_state_dom = async () => {
    let res = await this.props.api_actions.data_domain_edit(this.state.dom)
    if (res && res.data) {
      this.getData()
    }
  }
  gotData = (dom) => {
    // dom is the DB row, from BE
    let syns = dom.syns ? (dom.syns.trim() + ", ").replace(/[,]+/g, ",") : ""
    let syns1 = Array.isArray(dom.syns1) ? dom.syns1 : []
    // show new data
    this.setState({
      dom: {
        ...dom,
        // syns
        syns: syns,
        // convert syns1 to string
        syns1:
          syns1
            .map((w) => w.trim())
            .filter((w) => !!w)
            .join(", ") + (syns1.length ? ", " : "")
      }
    })
    // scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  gotDataDict = (dom) => {
    // show new data
    this.setState({
      synsDict: dom
    })
  }
  getData = async () => {
    // get data
    let { tld } = this.props
    if (tld) {
      // get row (tld, syns, syns1)
      let dom = await this.props.api_actions.data_domain_get(tld)
      if (dom && dom.key) {
        this.gotData(dom)
      }
      // get expanded list of %ILIKE% results
      let data = await this.props.api_actions.data_domain_syns_dict(tld)
      if (data) {
        this.gotDataDict(data)
      }
    }
  }
  getAllDomains = async () => {
    let doms = await this.props.api_actions.data_domains_all()
    this.setState({
      all_domains: doms || []
    })
  }

  componentDidMount() {
    /*
     * trigger update list of all domains from DB
     */
    this.getAllDomains()

    if (this.props.tld) {
      this.getData()
    }
  }

  componentDidUpdate(prevProps) {
    let last = prevProps.tld
    let next = this.props.tld
    if (next && next !== last) {
      this.getData()
    }
  }

  render() {
    let { tld } = this.props
    let { dom } = this.state

    /*
     * Verify content:
     */
    let PageContent = null
    // nothing queried yet:
    if (!tld) {
      PageContent = <div className="page content"> </div>
    }
    // no domain:
    else if (!dom || !dom.key) {
      PageContent = (
        <div className="page content">
          Not found "<b>{tld}</b>"
        </div>
      )
    }
    // verified OK:
    else {
      PageContent = <EditDomainResults that={this} />
    }

    /*
     * Render content:
     */
    return (
      <>
        <StyledSearch>
          <Search
            {...this.props}
            domains={true}
            hideInput={true}
            cue={[<span key="1">&#9757; Choose a domain extension to edit.&nbsp;</span>]}
          />
        </StyledSearch>

        <StyledPage>{PageContent}</StyledPage>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    input_actions: bindActionCreators(input_actions, dispatch),
    ui_actions: bindActionCreators(ui_actions, dispatch),
    api_actions: bindActionCreators(api_actions, dispatch)
  }
}

const mapStateToProps = function (state) {
  return {
    tld: Object.keys(state.output.tlds_user)[0],
    tlds_user: state.output.tlds_user,
    tlds_all: state.output.tlds_all
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDomain)
