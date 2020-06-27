import React from "react"
import { Styled } from "./ViewWord.styled"
import Search from "../../components/Search"
import { StyledPage } from "../../components/Page.styled"
import { Link } from "gatsby"

export default function (props) {
  /*
   * User "container" state/props/methods!
   * This "child" component is to simplify container's render() logic.
   */
  let that = props.that
  /*
   * Variables
   */
  // for content
  let { word_input } = that.props
  return (
    <>
      <Search
        {...that.props}
        className={!word_input ? "Search SearchHome" : "Search"}
        domains={false}
        title="Another word for..."
        placeholder="..."
        home={true}
        cue={[
          <span key="1">The most accurate thesaurus API&nbsp;</span>,
          <span key="2">for Natural Language Processing applications.</span>,
          <div key="3">
            Currently powers <Link to="/domain">NLP.domains</Link>. More info coming soon!
          </div>
        ]}
      />
      <StyledPage>
        <Styled className="ViewWord content">
          <p>
            Try it out &#9757; Type in any word, like <Link to="/word?word=aloha">aloha</Link> or{" "}
            <Link to="/word?word=appendectomy">appendectomy</Link>.
          </p>
          <p>More info and functionality coming soon!</p>
          <p>This service is in stealth mode! Under active development.</p>
        </Styled>
      </StyledPage>
    </>
  )
}
