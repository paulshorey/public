import React from "react"
import { Link } from "gatsby"
import Fields from "./Fields"
import Pos from "./Pos"
import FieldList from "./FieldList"
import { Styled } from "./EditWord.styled"
import { faEye } from "@fortawesome/pro-regular-svg-icons"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"

export default function (props) {
  /*
   * User "container" state/props/methods!
   * This "child" component is to simplify container's render() logic.
   */
  let that = props.that

  let { word_chunks, input_str, api_actions } = that.props
  let row = word_chunks[input_str]
  console.log("row", row)

  return (
    <Styled className="EditWord content">
      {/*View*/}
      <Link className={"editWordLink"} to={`/word?word=${that.props.input_str}`}>
        <FA icon={faEye} className="faEye" style={{ transform: "scale(0.85)" }} />
      </Link>
      {/*Fields*/}
      <Fields api_actions={api_actions} row={row} rowkey={row.key} />
      {/*PoS*/}
      {[row.pos1, row.pos2, row.pos3, row.pos4, row.pos5, "bef", "aft", "ety", "etc"].map((pos, pi) => (
        <Pos api_actions={api_actions} pos={pos} row={row} key={pos + pi} />
      ))}
      {/*Lists*/}
      {["ok_list", "list"].map((field, pi) => (
        <FieldList api_actions={api_actions} field={field} row={row} key={row.key + pi} />
      ))}
    </Styled>
  )
}
