import React from "react"
import { DomainsResultsStyled } from "./DomainsResults.styled"
import Options from "./Options"
import Tlds from "./Tlds"
import Doms from "./Doms"
import { ShowLinkStyled, ColorsStyled } from "./Domains.styled"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp, faCode } from "@fortawesome/pro-regular-svg-icons"
import Search from "../../components/Search"
import { faBolt, faTimes, faStar as faStarSolid, faHeart as faHeartSolid } from "@fortawesome/pro-solid-svg-icons"
import { ___, __, _ } from "./Domains"

const DomainsResults = function (props) {
  /*
   * User "container" state/props/methods!
   * This "child" component is to simplify container's render() logic.
   */
  let that = props.that
  /*
   * View variables:
   */
  // for results:
  let {
    suggestions_phrase_lists,
    word_hacks,
    suggestions_availability,
    input_str,
    input_tld,
    input_spellchecked
  } = that.props
  let cue = []
  let original_domain = input_str.replace(/ /g, "") + "." + input_tld
  let original_code = suggestions_availability[original_domain]
  // get on the winning team...
  if (input_spellchecked !== input_str) {
    let spelled = input_spellchecked.replace(/ /g, "") + "." + input_tld
    let spelled_code = suggestions_availability[spelled]
    if (original_code !== 1 && spelled_code == 1) {
      original_code = 1
      original_domain = spelled
    }
  }
  /*
   * message about availability
   */
  if (!original_code) {
    cue.push(<span key="avai">Checking availability...</span>)
  } else if (original_code > 1 && original_code < 100) {
    cue.push(<span key="avai">"{original_domain}" is not available.</span>)
  } else if (original_code > 100 && original_code < 1000000) {
    cue.push(
      <span key="avai">
        "{original_domain}" is being sold for ${Math.round(original_code).toLocaleString()}
      </span>
    )
  } else if (original_code > 1000000) {
    cue.push(
      <span key="avai">
        "{original_domain}" will expire on <b>{(new Date(original_code * 1000) || "").substring(4, 15)}</b>
      </span>
    )
  } else if (original_code == 1) {
    cue.push(
      <span key="avai" className="color-attention">
        <FA key={1} icon={faStarSolid} className="faStar" /> <b>{original_domain}</b> is available!
      </span>
    )
  } else {
    cue.push(
      <span key="avai">
        "{original_domain}" availability is "{original_code}"!
      </span>
    )
  }
  /*
   * message about spell check
   */
  if (input_spellchecked && input_spellchecked.replace(/ /g, "") !== input_str.replace(/ /g, "")) {
    cue.push(
      <div key="spellchecked" className="spellchecked">
        Also including suggestions for "
        <b className="color-white">
          {input_spellchecked.split(" ").map((str, si) => (
            <span key={si}>
              {str}
              <___ />
            </span>
          ))}
          .{input_tld}
        </b>
        ". <br />
        To avoid spell-checking any word or phrase, put it in "quotes".
      </div>
    )
  }
  // cue.push(
  //   <div key="spellchecked">
  //     Including results for "yeah
  //     <__ />
  //     coach
  //     <___ />
  //     .com".
  //     <a href="">
  //       {" "}
  //       Click here to search only "
  //       <b>
  //         yeah
  //         <___ />
  //         .coach
  //       </b>
  //       "
  //     </a>
  //     .
  //   </div>
  // )
  /*
   * show message
   */
  let cue_nav = (
    <ShowLinkStyled
      className="showThesaurus"
      onClick={() => {
        that.props.ui_actions.RX__toggle_poss()
      }}
    >
      {/*<span className="show-large">powered by:&nbsp; </span>*/}
      {/*<FA icon={faBolt} className="faBolt color-accent" style={{ transform: "scale(0.95)", opacity: "0.95" }} />*/}
      {/*&nbsp;&thinsp;*/}
      {that.props.show_poss ? (
        <>
          <FA icon={faTimes} className="toggleNLPThesaurus faBolt color-accent" />
          <span className="color-accent">&nbsp;NLP&thinsp;Thesaurus&thinsp;.com</span>
        </>
      ) : (
        <>
          <FA icon={faBolt} className="toggleNLPThesaurus faBolt color-accent" />
          &nbsp;NLP&thinsp;Thesaurus&thinsp;.com
        </>
      )}
    </ShowLinkStyled>
  )

  return (
    <DomainsResultsStyled>
      <Search
        {...that.props}
        className={"Search"}
        domains={true}
        title="Find an Available Domain Name:"
        // title_nav={
        //   <a href="" className="hide-small">
        //     <span className="color-subtle">get the API </span>
        //     <FA icon={faCode} className="faCode" />
        //   </a>
        // }
        cue={cue}
        cue_nav={cue_nav}
      />

      <div className="container">
        {/*
         * Show WIP
         */}
        {/*<ShowLinkStyled className="showWip">*/}
        {/*  {that.state.showWip ? (*/}
        {/*    <>*/}
        {/*      <span onClick={that.toggleWip} className="hide-small">*/}
        {/*        hide&nbsp;*/}
        {/*      </span>*/}
        {/*      WIP <FA icon={faAngleDown} />*/}
        {/*    </>*/}
        {/*  ) : (*/}
        {/*    <>*/}
        {/*      <span onClick={that.toggleWip} className="hide-small">*/}
        {/*        show&nbsp;*/}
        {/*      </span>*/}
        {/*      WIP <FA icon={faAngleUp} />*/}
        {/*    </>*/}
        {/*  )}*/}
        {/*</ShowLinkStyled>*/}

        {/*
         * Options
         */}
        <Options key="options" that={that} />
        {/*
         * Suggestions + TLDs + WIP
         */}
        <ColorsStyled
          className={"content results " + (!that.state.gotAvailability ? " gettingAvailability" : " gotAvailability")}
        >
          {/*
           * WIP
           */}
          {!!that.state.showWip && (
            <div className="wip">
              {/*
               * X - click to hide
               */}
              <ShowLinkStyled className="showOptions hideWip color-accent">
                <FA onClick={that.toggleWip} icon={faTimes} className="faBolt" />
                <span onClick={that.toggleWip} className="hide-small">
                  {" "}
                  hide
                </span>
                <span onClick={that.toggleWip}> WIP</span>
              </ShowLinkStyled>
              <div className="doms columns">
                {/*
                 * WIP PHRASE LISTS (debugging, temporary)
                 */}
                {Object.keys(suggestions_phrase_lists || {}).map((title, i) => {
                  let lists = suggestions_phrase_lists[title]
                  return (
                    <div key={title + i} className="column">
                      <div className="nowrap">
                        <b>{title}</b>
                      </div>
                      <div>
                        {lists.map((phrase, pi) => (
                          <div key={pi}>&quot;{phrase.join(" ")}&quot;</div>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {/*
                 * WIP word hacks
                 */}
                <div className="column">
                  <div className="nowrap">
                    <b>word hacks</b>
                  </div>
                  <div className="pre">
                    {word_hacks.map((phrase, pi) => (
                      <div key={pi}>&quot;{phrase}&quot;</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/*
           * Results
           */}
          {!that.state.showWip && (
            <>
              <Doms that={that} />
              <Tlds that={that} />
            </>
          )}
        </ColorsStyled>
      </div>
    </DomainsResultsStyled>
  )
}

export default DomainsResults
