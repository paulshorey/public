import React from "react"
import { Select, Input, Tooltip } from "antd"
import "./Fields.scss"
import { arr_truthy_values } from "universal-common-scripts/functions/arrays"
import { obj_is_equal } from "universal-common-scripts/functions/objects"
import Tags from "src/components/Tags"
import Tip from "src/components/Tip"
import DomExt from "../EditDomain/DomExt"
import pos_expand from "data/words/function/pos_expand"

const { Option } = Select

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      prevFormData: {}
    }
  }

  submitFields = async () => {
    console.log("submitFields", this.state)
    // validate
    if (obj_is_equal(this.state.prevFormData, this.state.formData)) {
      return false
    }
    // process
    let formData = { ...this.state.formData }
    this.setState({
      prevFormData: JSON.parse(JSON.stringify(formData))
    })
    // fix pos
    // conform component state to DB row data structure
    let pos = formData.pos
    delete formData.pos
    if (pos) {
      formData.pos1 = (pos[0] || "").trim().substring(0, 3)
      formData.pos2 = (pos[1] || "").trim().substring(0, 3)
      formData.pos3 = (pos[2] || "").trim().substring(0, 3)
      formData.pos4 = (pos[3] || "").trim().substring(0, 3)
      formData.pos5 = (pos[4] || "").trim().substring(0, 3)
    }
    // save
    console.log("formData", formData)
    await this.props.api_actions.data_word_edit(formData)
  }

  async componentDidMount() {
    this.setState_formData_fromRow(this.props.row)
  }

  async componentDidUpdate(prevProps) {
    if (this.props.rowkey && this.props.row && this.props.rowkey !== prevProps.rowkey) {
      this.setState_formData_fromRow(this.props.row)
    }
  }

  /**
   * This function is called from React Lifecycle,
   * to sync state with props
   * It not called by user input.
   */
  setState_formData_fromRow = (row) => {
    let formData = {
      key: row.key,
      root: row.root,
      singular: row.singular,
      plural: row.plural,
      proper: row.proper,
      abbreviation: row.abbreviation,
      acronym: row.acronym,
      ws_sentiment: row.ws_sentiment,
      // pos: arr_truthy_values([row.pos1, row.pos2, row.pos3, row.pos4, row.pos5]).toString().replace(/,/g, ', '),
      pos: arr_truthy_values([row.pos1, row.pos2, row.pos3, row.pos4, row.pos5].map((str) => pos_expand(str))),
      derivations: (Array.isArray(row.derivations) ? row.derivations : [])
        .map((w) => w.trim())
        .filter((w) => !!w)
        .join(", ")
    }
    this.setState({
      domains: (row.tlds || []).flat(),
      best_of: (row.pos_short || {}).all || [],
      formData: formData,
      prevFormData: JSON.parse(JSON.stringify(formData)),
      tips: {
        key: "",
        root: (
          <>
            root word, word in its simplest form
            <hr />
            (put singular into its own field below)
          </>
        ),
        singular: (
          <>
            if "singular" form exists, should go here <hr />
            if same as root, please delete the root
          </>
        ),
        plural: (
          <>
            if "plural" form exists, should go here <hr />
            if same as root, please delete the root
          </>
        ),
        proper: (
          <>
            if word should be capitalized, write capitalized version here <hr />
            usually its same as the word, but with uppercase first letter,
            <br />
            but rarely proper version may be totally different
          </>
        ),
        abbreviation: <>abbreviation of education is "edu"</>,
        acronym: <>acronym of "in real life" is "IRL"</>
      }
    })
  }

  render() {
    let { formData } = this.state
    if (!formData) {
      return <p>Loading...</p>
    }
    return (
      <div className={"Fields ui-form-fieldset-grid ui-form-section"}>
        {/*
         * Best of
         */}
        <div className="ui-form-fieldset">
          <Tooltip
            className="label"
            title={"Experimental feature - not yet saved to database. Please see if this looks correct!"}
          >
            <span>best:</span>
            <Tip /> &nbsp;
          </Tooltip>
          <span className="value">{this.state.best_of && this.state.best_of.join(", ")}</span>
        </div>

        {/*
         * Domains
         */}
        {this.state.domains && (
          <div className="ui-form-fieldset">
            <span className="label">domains:</span>
            <span className="value">
              {this.state.domains.map((dom, i) => (
                <DomExt key={dom + i} domext={dom} />
              ))}
            </span>
          </div>
        )}

        {/*
         * Simple inputs
         */}
        {["root", "singular", "plural", "proper", "abbreviation", "acronym", "modal"].map((name) => {
          return (
            <div className="ui-form-fieldset" key={name}>
              <div className={"label"}>
                <Tooltip title={this.state.tips[name]}>
                  <span className={"noselect"}>{name}:</span>
                  <Tip />
                </Tooltip>
              </div>
              <div className={"value"}>
                <Input
                  className={"minimal"}
                  // size="small"
                  value={formData[name] || ""}
                  onChange={(event) => {
                    this.setState({
                      formData: { ...formData, [name]: event.target.value }
                    })
                  }}
                  onBlur={this.submitFields}
                />
              </div>
            </div>
          )
        })}

        {/*
         * ws_sentiment
         */}
        <div className={"ui-form-fieldset"}>
          <div className={"label"}>
            <Tooltip title={<p className={"Popovercontent help"}>Good/OK are interchangeable. Bad is what matters.</p>}>
              <span className={"noselect"}>sentiment:</span>
              <Tip />
            </Tooltip>
          </div>
          <div className={"value"}>
            <Select
              value={formData["ws_sentiment"]}
              onChange={(value) => {
                this.setState(
                  {
                    formData: { ...formData, ws_sentiment: Number(value) }
                  },
                  this.submitFields
                )
              }}
            >
              <Option value="">choose</Option>
              <Option value="1">1 (Positive)</Option>
              <Option value="0">0 (Neutral)</Option>
              <Option value="-1">-1 (Bad)</Option>
            </Select>
          </div>
        </div>

        {/*
         * pos
         */}
        <div className={"ui-form-fieldset postags"}>
          <div className={"label"}>
            <Tooltip
              title={
                <div className={"help"}>
                  <p>Required:</p>
                  <p>
                    The order of all synonyms below depends on this.
                    <br />
                    Enter comma-separated list of parts-of-speech, <b>in order !</b>
                  </p>
                  <p>
                    Choices are:
                    <br />
                    nouns, verbs, adverbs, adjectives, interjections, conjunctions, determiners, pronouns, prepositions
                  </p>
                </div>
              }
            >
              <span className={"noselect"}>parts of speech:</span>
              <Tip />
            </Tooltip>
          </div>
          <div className={"value"}>
            <Select
              value={""}
              onChange={(value) => {
                let pos = this.state.formData.pos
                if (!pos.includes(value) && value) {
                  pos.unshift(value)
                }
                this.setState(
                  {
                    formData: { ...formData, pos: pos }
                  },
                  this.submitFields
                )
              }}
            >
              <Option value="">+&nbsp;</Option>
              <Option value="nouns">nouns</Option>
              <Option value="verbs">verbs</Option>
              <Option value="adverbs">adverbs</Option>
              <Option value="adjectives">adjectives</Option>
              <Option value="interjections">interjections</Option>
              <Option value="conjunctions">conjunctions</Option>
              <Option value="determiners">determiners</Option>
              <Option value="prepositions">prepositions</Option>
              <Option value="pronouns">pronouns</Option>
            </Select>

            <Tags
              tags={formData.pos}
              onChange={(newpos) => {
                this.setState(
                  {
                    formData: { ...formData, pos: newpos }
                  },
                  this.submitFields
                )
              }}
            />
          </div>
        </div>

        {/*
         * derivations
         */}
        <div className={"ui-form-fieldset"}>
          <div className={"label"}>
            <Tooltip title={"comma, separated, list"}>
              <span>derivations:</span>
              <Tip />
            </Tooltip>
          </div>
          <div className={"value flexgrow"}>
            <Input
              className={""}
              value={formData["derivations"]}
              onChange={(event) => {
                this.setState({
                  formData: { ...formData, derivations: event.target.value }
                })
              }}
              onBlur={this.submitFields}
            />
          </div>
        </div>
      </div>
    )
  }
}
