import React from "react"
import { Link } from "gatsby"
import Field from "./Field"
import Pos from "./Pos"
import FieldList from "./FieldList"
import { Styled } from "./ViewWord.styled"
import { faEdit } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import DomExt from "../Admin/EditDomain/DomExt"
import PosWord from "./PosWord"
import Search from "../../components/Search"
import { StyledPage } from "../../components/Page.styled"

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
  let { word_input, word_chunks, api_actions } = that.props
  let SearchAndHeader = (
    <Search
      {...that.props}
      className={!word_input || !word_chunks.length ? "Search SearchHome" : "Search"}
      domains={false}
      title="Another word for..."
      placeholder="..."
      cue={[
        <span key="1">The most accurate thesaurus API&nbsp;</span>,
        <span key="2">
          for <>N</>atural <>L</>anguage <>P</>rocessing applications.
        </span>
      ]}
    />
  )
  if (word_input && !word_chunks[word_input]) {
    return (
      <>
        {SearchAndHeader}
        <Styled className="ViewWord content">
          <p>Word not found</p>
        </Styled>
      </>
    )
  }
  let row = word_chunks[word_input]
  let domains = (row.tlds || []).flat()
  let best_of = (row.pos_short || {}).all || []
  console.log("row", row)

  return (
    <>
      {SearchAndHeader}
      <StyledPage>
        <Styled className="ViewWord content">
          {/*Edit*/}
          <Link className={"editWordLink"} to={`/edit_word?word=${row.key}`}>
            <FA icon={faEdit} className="faEdit" style={{ transform: "scale(0.85)" }} />
          </Link>

          {/*Fields*/}
          <div className={"ui-form-section ui-form-fieldset-grid"}>
            {[
              "modal",
              "key",
              "root",
              "prefix",
              "singular",
              "plural",
              "abbreviation",
              "acronym",
              "list_count",
              "ws_sentiment"
            ]
              .filter((field) => row[field] || row[field] === 0)
              .map((field, pi) => (
                <Field field={field} row={row} key={row.key + pi} />
              ))}

            {/*
             * Best Of
             */}
            {best_of && (
              <div className="ui-form-fieldset">
                <span className="label">best_of:</span>
                <span className="value">
                  {best_of.map((w, i) => (
                    <PosWord api_actions={api_actions} key={w} word={w} />
                  ))}
                </span>
              </div>
            )}

            {/*
             * Domains
             */}
            {domains && (
              <div className="ui-form-fieldset">
                <span className="label">domains:</span>
                <span className="value">
                  {domains.map((dom, i) => (
                    <DomExt key={dom + i} domext={dom} />
                  ))}
                </span>
              </div>
            )}
          </div>

          {/*
           * Lists
           */}
          <div className={"ui-form-section"}>
            {[row.pos1, row.pos2, "bef", "aft", "ety", "etc"].map((pos, pi) => (
              <Pos api_actions={api_actions} pos={pos} row={row} key={pos + pi} expand={false} />
            ))}
            {["ok_list", "list"].map((field, pi) => (
              <FieldList field={field} row={row} key={row.key + pi} />
            ))}
          </div>
        </Styled>
      </StyledPage>
    </>
  )
}
