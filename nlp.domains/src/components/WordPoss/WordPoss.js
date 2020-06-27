import React from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link } from "gatsby"
import { WordPossStyled } from "./WordPoss.styled"
import PosWord from "src/components/EditWord/PosWord"
import api_actions from "../../redux/actions/api"
import InputGroup from "../EditWord/InputGroup"
import pos_expand from "data/words/function/pos_expand"
import { faPen, faFile } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"

class WordPoss extends React.Component {
  render() {
    let { word_chunks, show_poss, api_actions } = this.props
    let chunks_list = Object.values(word_chunks)
    if (!chunks_list.length) {
      return null
    }
    /*
     * Render:
     */
    return (
      <WordPossStyled className={"WordPossStyled " + (show_poss ? " show" : " hide")}>
        <section className={"columns"}>
          {chunks_list.map((row, ri) => {
            // console.log("row in wordposs", row)
            if (!row || !row.poss || !row.pos_short[row.pos1]) {
              return null
            }
            let poss_dict = row.poss
            let poss_list = Object.keys(poss_dict)

            return (
              <div key={row.key + ri} className="column">
                {/*
                 * word key:
                 */}
                <span>
                  &quot;<b>{row.key}</b>&quot; &nbsp;
                </span>
                {/*
                 * word meta:
                 */}
                <div className="words">
                  {/* root */}
                  {row.root && row.root !== row.key && (
                    <span>
                      <span className="color-dark nn">root:</span>
                      &nbsp;<b>{row.root}</b>
                      &nbsp;&nbsp;
                    </span>
                  )}
                  {/* singular */}
                  {row.singular && row.singular !== row.key && (
                    <span>
                      <span className="color-dark nn">singular:</span>
                      &nbsp;<b>{row.singular}</b>
                      &nbsp;&nbsp;
                    </span>
                  )}
                  {/* plural */}
                  {row.plural && row.plural !== row.key && (
                    <span>
                      <span className="color-dark nn">plural:</span>
                      &nbsp;<b>{row.plural}</b>
                      &nbsp;&nbsp;
                    </span>
                  )}
                  {/* abbreviation */}
                  {row.abbreviation && row.abbreviation !== row.key && (
                    <span>
                      <span className="color-dark nn">abbreviation:</span>
                      &nbsp;<b>{row.abbreviation}</b>
                      &nbsp;&nbsp;
                    </span>
                  )}
                  {/* acronym */}
                  {row.acronym && row.acronym !== row.key && (
                    <span>
                      <span className="color-dark nn">acronym:</span>
                      &nbsp;<b>{row.acronym}</b>
                      &nbsp;&nbsp;
                    </span>
                  )}
                </div>
                {/*
                 * if no pos:
                 */}
                {!poss_dict[row.pos1] && (
                  <div className="">
                    <section className={"columns"}>
                      <div className="column">
                        <h5 className="color-dark nn">{pos_expand(row.pos1)}:</h5>
                      </div>
                    </section>
                  </div>
                )}
                {/*
                 * word pos:
                 */}
                <div className="">
                  {poss_list.map((pos, pi) => {
                    if (poss_dict[pos] && poss_dict[pos].length) {
                      return (
                        <section key={pi} className={"columns"}>
                          <div className="column">
                            {/*
                             * pos key:
                             */}
                            <h5 className="color-dark nn">{pos_expand(pos)}:</h5>
                            {/*
                             * add synonyms to pos:
                             */}
                            <InputGroup className="pos_inputgroup" word={row.key} pos={pos} api_actions={api_actions} />
                            {/*
                             * view/edit pos:
                             */}
                            <div className="words">
                              {poss_dict[pos].map((w, wi) =>
                                !pos.includes("domains") ? (
                                  <span key={wi}>
                                    <PosWord row={row} word={w} info={undefined} api_actions={api_actions} />
                                  </span>
                                ) : (
                                  <span key={w}>
                                    <Link target="_blank" to={"/edit_domain?tld=" + w}>
                                      {w}
                                    </Link>
                                    , &thinsp;
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </section>
                      )
                    }
                  })}

                  {/*
                   * tlds
                   */}
                  <section className={"columns"}>
                    <div className="column">
                      {/*
                       * pos key:
                       */}
                      <h5 className="color-dark nn">tlds:</h5>
                      {/*
                       * view/edit pos:
                       */}
                      <div className="words">
                        {row.tlds.map((list, li) => (
                          <div key={li}>
                            list #{li}:{" "}
                            {list.map((word, wi) => (
                              <span key={wi}>
                                <a
                                  className="color-link"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    window.open(`/edit_domain?tld=${word}`)
                                  }}
                                >
                                  {word}
                                </a>
                                ,{" "}
                              </span>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
                <p>
                  <span
                    className="color-link clickable"
                    onClick={(e) => {
                      e.preventDefault()
                      window.open(`/word?word=${row.key}`)
                    }}
                  >
                    <FA icon={faFile} style={{ transform: "scale(0.85)" }} />
                    &thinsp;view full entry...
                  </span>
                  &nbsp;
                  <span
                    className="color-link clickable"
                    onClick={(e) => {
                      e.preventDefault()
                      window.open(`/edit_word?word=${row.key}`)
                    }}
                  >
                    <FA icon={faPen} style={{ transform: "scale(0.85)" }} />
                    &thinsp;edit
                  </span>{" "}
                  &nbsp;
                </p>
              </div>
            )
          })}
        </section>
      </WordPossStyled>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    api_actions: bindActionCreators(api_actions, dispatch)
  }
}

const mapStateToProps = function (state) {
  return {
    show_poss: state.ui.show_poss,
    word_chunks: state.input.chunks,
    word_tld: state.input.tld_chunk
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordPoss)
