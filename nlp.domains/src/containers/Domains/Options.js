import React from "react"
import { OptionsStyled } from "./Options.styled"
import { ShowLinkStyled } from "./Domains.styled"
import { Checkbox, Radio } from "antd"
import Legend from "./Legend"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faAngleUp, faAngleDown } from "@fortawesome/pro-regular-svg-icons"

const Options = function (props) {
  /*
   * User "container" state/props/methods!
   * This "child" component is to simplify container's render() logic.
   */
  let that = props.that
  /*
   * View
   */
  return (
    <OptionsStyled className={that.state.showOptions ? " show" : " hide"}>
      <>
        {/*
         *
         * LEGEND (always show)
         *
         */}
        <div className="content">
          {!that.state.showWip && <Legend className="options" that={that} />}

          {/*
           *
           * TOGGLE MORE OPTIONS (to show/hide 2nd content area, below)
           *
           */}
          {/*<ShowLinkStyled className="showOptions" onClick={that.toggleOptions}>*/}
          {/*  {that.state.showOptions ? <>hide</> : <>search</>} options&nbsp;*/}
          {/*  <svg className="gicon-sliders" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">*/}
          {/*    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />*/}
          {/*  </svg>*/}
          {/*</ShowLinkStyled>*/}
          <ShowLinkStyled className="showOptions">
            <FA onClick={that.toggleWip} icon={faAngleDown} />
            <span onClick={that.toggleWip} className="hide-small">
              {" "}
              show
            </span>
            <span onClick={that.toggleWip}> WIP</span>
          </ShowLinkStyled>
        </div>

        {/*
         *
         * MORE OPTIONS (show if clicked toggle link)
         *
         */}
        {!!that.state.showOptions && (
          <div className="content more_options">
            <div className="options">
              <div className="option">
                <span className="show-large">sort by:&nbsp;&nbsp;</span>
                <Radio.Group
                  defaultValue={that.props.search_options.length_vs_relevance}
                  size="small"
                  onChange={(e) => {
                    that.props.input_actions.RX__search_options({
                      length_vs_relevance: e.target.value
                    })
                  }}
                >
                  <Radio.Button value={0.1}>
                    &nbsp;shortest <span className="hide-small">name</span>
                  </Radio.Button>
                  <Radio.Button value={5}>both</Radio.Button>
                  <Radio.Button value={50}>most relevant&nbsp;</Radio.Button>
                </Radio.Group>
              </div>

              <div className="option hide-small">
                group by: &nbsp;
                <Radio.Group
                  defaultValue={that.props.search_options.group_by}
                  size="small"
                  onChange={(e) => {
                    that.props.input_actions.RX__search_options({
                      group_by: e.target.value
                    })
                  }}
                >
                  <Radio.Button value={"name"}>&nbsp;name</Radio.Button>
                  <Radio.Button value={"extension"}>extension&nbsp;</Radio.Button>
                </Radio.Group>
              </div>
            </div>
            <div className="options">
              <div className="option">
                <span className="show-large">use:&nbsp;&nbsp;</span>
                <span className="checkbox-group">
                  <Checkbox
                    className="Checkbox"
                    size="small"
                    checked={that.props.search_options.use_domain_hacks}
                    onClick={() => {
                      that.props.input_actions.RX__search_options({
                        use_domain_hacks: !that.props.search_options.use_domain_hacks
                      })
                    }}
                  />
                  <span className="symbol">domain hacks</span>
                </span>
                <span className="checkbox-group">
                  <Checkbox
                    className="Checkbox"
                    size="small"
                    checked={that.props.search_options.use_word_hacks}
                    onClick={() => {
                      that.props.input_actions.RX__search_options({
                        use_word_hacks: !that.props.search_options.use_word_hacks
                      })
                    }}
                  />
                  <span className="symbol">word hacks</span>
                </span>
                <span className="checkbox-group">
                  <Checkbox
                    className="Checkbox"
                    size="small"
                    checked={that.props.search_options.use_synonyms}
                    onClick={() => {
                      that.props.input_actions.RX__search_options({
                        use_synonyms: !that.props.search_options.use_synonyms
                      })
                    }}
                  />
                  <span className="symbol">synonyms</span>
                </span>
                <span className="checkbox-group">
                  <Checkbox
                    className="Checkbox"
                    size="small"
                    checked={that.props.search_options.use_before_after}
                    onClick={() => {
                      that.props.input_actions.RX__search_options({
                        use_before_after: !that.props.search_options.use_before_after
                      })
                    }}
                  />
                  <span className="symbol">before/after</span>
                </span>
              </div>
            </div>
            <p className="color-dark">Search options are not yet functional, but coming very soon!</p>
          </div>
        )}
      </>
    </OptionsStyled>
  )
}

export default Options
