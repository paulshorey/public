import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as ui_actions from "src/redux/actions/ui"
import api_actions from "src/redux/actions/api"
import * as input_actions from "src/redux/actions/input"
import ViewWordResults from "./ViewWordResults"
import ViewWordHome from "./ViewWordHome"

class ViewWord extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    props.ui_actions.RX__search_title("Thesaurus Search:")
  }

  componentDidMount() {
    this.props.input_actions.RX__get_domains(false)
  }

  render() {
    let { word_input } = this.props
    return <>{word_input ? <ViewWordResults that={this} /> : <ViewWordHome that={this} />}</>
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ui_actions: bindActionCreators(ui_actions, dispatch),
    api_actions: bindActionCreators(api_actions, dispatch),
    input_actions: bindActionCreators(input_actions, dispatch)
  }
}

const mapStateToProps = function (state) {
  return {
    word_poss: state.input.poss,
    word_input: state.input.input_str,
    word_chunks: state.input.chunks
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewWord)
