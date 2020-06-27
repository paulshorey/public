import React from "react"
import { Checkbox } from "antd"
import { ColorsStyled } from "./Domains.styled"
import { LegendStyled } from "./Legend.styled"
import { H5Styled } from "./Domains.styled"

const Legend = function (props) {
  /*
   * User "container" state/props/methods!
   * This "child" component is to simplify container's render() logic.
   */
  let that = props.that
  /*
   * View
   */
  return (
    <LegendStyled className={"LegendStyled" + (props.className ? " " + props.className : "")}>
      <ColorsStyled className="ColorsStyled">
        <H5Styled className="show-small">Show</H5Styled>
        {/*
         * Legend checkboxes
         */}
        <span className="dom_name status-available">
          <Checkbox
            className="Checkbox"
            size="small"
            checked={!that.props.hide_available}
            onChange={() => {
              that.toggleResults("available")
            }}
          />
          <span className="symbol">$</span>
          <span className="text show-large">available</span>
        </span>
        <span className="dom_name status-premium">
          <Checkbox
            className="Checkbox"
            size="small"
            checked={!that.props.hide_premium}
            onChange={() => {
              that.toggleResults("premium")
            }}
          />
          <span className="symbol">$$</span>
          <span className="text show-large">premium</span>
        </span>
        {/*<span className="dom_name status9">*/}
        {/*  <Checkbox*/}
        {/*    className="Checkbox"*/}
        {/*    size="small"*/}
        {/*    checked={!that.props.hide_other}*/}
        {/*    onChange={() => {*/}
        {/*      that.toggleResults('other')*/}
        {/*    }}*/}
        {/*  />*/}
        {/*  <span className="symbol">?</span>*/}
        {/*  <span className="text show-large">other</span>*/}
        {/*</span>*/}
        <span className="dom_name status-unavailable">
          <Checkbox
            className="Checkbox"
            size="small"
            checked={!that.props.hide_unavailable}
            onChange={() => {
              that.toggleResults("unavailable")
            }}
          />
          <span className="symbol">?</span>
          <span className="text show-large">unavailable</span>
        </span>
        <span className="dom_name status-other">
          <Checkbox
            style={{ opacity: 0.95 }}
            className="Checkbox"
            size="small"
            checked={!that.props.hide_other}
            onChange={() => {
              that.toggleResults("other")
            }}
          />
          <span className="symbol">??</span>
          <span className="symbol show-large">other</span>
        </span>
      </ColorsStyled>
    </LegendStyled>
  )
}

export default Legend
