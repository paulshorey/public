import React from "react"
import Hint from "src/components/Hint"
import PosWord from "./PosWord"
import { faAngleUp, faEllipsisH } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
// import { asort_by_length_and_position } from 'universal-common-scripts/functions/asort_strings'
import pos_expand from "data/words/function/pos_expand"

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      advanced: props.expand || false
    }
  }

  render() {
    let { pos, row, api_actions } = this.props
    /*
     * validate
     */
    if (!pos) {
      return null
    }
    /*
     * slice of row.dict,
     * with before/after
     */
    let slist_n = 0
    let slist = {}
    for (let word in row.dict) {
      let info = row.dict[word]
      // info[11] = bef/aft/ety
      // info[9] = nou/ver/adj
      // info[12] = must be real synonym, not derivation
      if (pos === (info[11] || info[9]) && info[12]) {
        slist[word] = info
        slist_n++
      }
    }
    if (!slist_n) {
      return null
    }
    /*
     * shortened preview
     */
    let slist_shorter = (row.pos_short && row.pos_short[pos]) || []
    console.log("row", row)
    /*
     * Predefined lists of words
     * info = [ 0-1 (bad-ok), 0-1 (ok-proper), 0-1 (ok-unknown) ]
     * ok = [ 1, 0, 0 ]
     */
    let ListShorter = slist_shorter.map((word) => <PosWord api_actions={api_actions} key={word} word={word} />)
    let ListOk = Object.entries(slist)
      .map((tuple) => {
        let [word, info] = tuple
        if (info[0] === 1 && info[1] === 0) {
          return <PosWord api_actions={api_actions} key={word} word={word} />
        }
      })
      .filter((val) => !!val)
    let ListBad = Object.entries(slist)
      .map((tuple) => {
        let [word, info] = tuple
        if (info[0] === 0 && info[1] === 0) {
          return <PosWord api_actions={api_actions} key={word} word={word} />
        }
      })
      .filter((val) => !!val)
    let ListProper = Object.entries(slist)
      .map((tuple) => {
        let [word, info] = tuple
        if (info[1] === 1) {
          return <PosWord api_actions={api_actions} key={word} word={word} />
        }
      })
      .filter((val) => !!val)
    let ListUnknown = Object.entries(slist)
      .map((tuple) => {
        let [word, info] = tuple
        if (info[2] === 1) {
          return <PosWord api_actions={api_actions} key={word} word={word} />
        }
      })
      .filter((val) => !!val)

    /*
     *
     * Render simple version:
     *
     */
    if (!this.state.advanced && ListShorter.length) {
      return (
        <div className={"ui-form-section simple"}>
          <div>
            <div className={"one"}>
              <b>{pos_expand(pos)}: </b>
            </div>
            <div className="two posWords" style={{ marginBottom: 15 }}>
              {ListShorter}
            </div>
            <div
              className={"three"}
              onClick={() => {
                this.setState({ advanced: true })
              }}
            >
              <FA icon={faEllipsisH} className="faEllipsisH" />
            </div>
          </div>
        </div>
      )
    } else {
      /*
       *
       * Render advanced version:
       *
       */
      if (!ListOk.length && !ListBad.length && !ListProper.length && !ListUnknown.length) {
        return null
      }
      return (
        <div className={"ui-form-section advanced"}>
          <p className={"one"}>
            <b className="title">{pos_expand(pos)}:</b>
          </p>

          <div className={"two"}>
            {ListShorter.length > 0 && (
              <p>
                {/*<sub>{<>&#128512;</>}: </sub>*/}
                <Hint className={"color-accent opacity50"}>Sorted by length:</Hint>
                <span className="posWords opacity50">{ListShorter}</span>
              </p>
            )}
            {ListOk.length > 0 && (
              <p>
                {/*<sub>{<>&#128512;</>}: </sub>*/}
                <Hint className={"color-accent opacity50"}>Ok/Good:</Hint>
                <span className="posWords">{ListOk}</span>
              </p>
            )}
            {ListBad.length > 0 && (
              <p>
                {/*<sub>{<>&#128545;</>}: </sub>*/}
                <Hint className={"color-bad opacity50"}>Negative:</Hint>
                <span className="posWords">{ListBad}</span>
              </p>
            )}
            {ListProper.length > 0 && (
              <p>
                {/*<sub>{<>&#127963;</>}: </sub>*/}
                <Hint className={"color-light opacity75"}>Proper:</Hint>
                <span className="posWords">{ListProper}</span>
              </p>
            )}
            {ListUnknown.length > 0 && (
              <p>
                {/*<sub>{<>&#10067;</>}: </sub>*/}
                <Hint className={"color-light opacity75"}>Unknown sentiment:</Hint>
                <span className="posWords">{ListUnknown}</span>
              </p>
            )}
          </div>

          <p
            className={"three"}
            onClick={() => {
              this.setState({ advanced: false })
            }}
          >
            <FA icon={faAngleUp} className="faAngleUp" />
          </p>
        </div>
      )
    }
  }
}
