import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Page"
import Header from "../components/Header"
import { faTimes } from "@fortawesome/pro-light-svg-icons"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { TitleWithXLink, ComparisonTable } from "../contact.styled"

const sources = [
  "NLP.Domains",
  "DomainsBot",
  "Domainr",
  "DomainWheel",
  "Godaddy",
  "NameCheap",
  "101Domains",
  "UniRegistry",
  "PorkBun"
]

const results = {
  "simplesolutions.com": {
    "NLP.Domains": ["a.com", "b.com", "c.com"],
    "DomainWheel": ["a.com", "b.com", "c.com"],
    "DomainsBot": ["a.com", "b.com", "c.com"],
    "Domainr": ["a.com", "b.com", "c.com"],
    "Godaddy": ["a.com", "b.com", "c.com"],
    "NameCheap": ["a.com", "b.com", "c.com"],
    "101Domains": ["a.com", "b.com", "c.com"],
    "UniRegistry": ["a.com", "b.com", "c.com"],
    "PorkBun": ["a.com", "b.com", "c.com"]
  },
  "etc123.com": {
    "NLP.Domains": ["1.com", "2.com", "3.com"],
    "DomainWheel": ["1.com", "2.com", "3.com"],
    "DomainsBot": ["1.com", "2.com", "3.com"],
    "Domainr": ["1.com", "2.com", "3.com"],
    "Godaddy": ["1.com", "2.com", "3.com"],
    "NameCheap": ["1.com", "2.com", "3.com"],
    "101Domains": ["1.com", "2.com", "3.com"],
    "UniRegistry": ["1.com", "2.com", "3.com"],
    "PorkBun": ["1.com", "2.com", "3.com"]
  }
}

class RootIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: "simplesolutions.com",
      results: results["simplesolutions.com"]
    }
  }
  render() {
    return (
      <Layout location={this.props.location}>
        <Header location={this.props.location} standalone={true} />
        <div className="content">
          <TitleWithXLink>
            Available results for user search "
            <select>
              {Object.keys(results).map((str) => (
                <option
                  onClick={() => {
                    this.setState({
                      search: str,
                      results: results[str]
                    })
                  }}
                >
                  {str}
                </option>
              ))}
            </select>
            ", by source:
            {/*<Link to="/">*/}
            {/*  <FA icon={faTimes} className="faTimes" />*/}
            {/*</Link>*/}
          </TitleWithXLink>
          <br />
          <ComparisonTable>
            <tbody>
              <tr>
                {sources.map((str) => (
                  <th key={str}>{str}:</th>
                ))}
              </tr>
              <tr>
                {sources.map((str) => {
                  let list = this.state.results[str]
                  return (
                    <td key={str}>
                      {list.map((str) => (
                        <div key={str}>{str}</div>
                      ))}
                    </td>
                  )
                })}
              </tr>
            </tbody>
          </ComparisonTable>
        </div>
      </Layout>
    )
  }
}

export default RootIndex
