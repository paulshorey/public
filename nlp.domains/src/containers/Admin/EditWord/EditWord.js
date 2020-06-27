import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as ui_actions from "src/redux/actions/ui"
import * as input_actions from "src/redux/actions/input"
import api_actions from "src/redux/actions/api"
import { StyledPage, StyledSearch } from "../../../components/Page.styled"
import Search from "../../../components/Search"
import EditWordResults from "./EditWordResults"

class ViewWord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.input_actions.RX__get_domains(false)
  }

  render() {
    let PageContent = null
    let { word_chunks, input_str } = this.props
    /*
     * Verify Content:
     */
    if (!input_str) {
      PageContent = <p className="content"> </p>
    } else if (!word_chunks[input_str] || !word_chunks[input_str].key) {
      PageContent = <p className="content">Word or phrase you entered is not found &#9757;</p>
    } else {
      PageContent = <EditWordResults that={this} />
    }
    /*
     * Render content:
     */
    return (
      <>
        <StyledSearch>
          <Search {...this.props} domains={false} cue={[<span key="1">Edit a word in the thesaurus. &#9757;</span>]} />
        </StyledSearch>

        <StyledPage>{PageContent}</StyledPage>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ui_actions: bindActionCreators(ui_actions, dispatch),
    input_actions: bindActionCreators(input_actions, dispatch),
    api_actions: bindActionCreators(api_actions, dispatch)
  }
}

const mapStateToProps = function (state) {
  return {
    input_str: state.input.input_str,
    word_chunks: state.input.chunks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewWord)
