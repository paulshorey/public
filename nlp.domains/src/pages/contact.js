import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Page"
import Header from "../components/Header"
import { AboutUs, AboutUsTable, TitleWithButton, ContactUsButton, ContactPopup, TitleWithXLink } from "../contact.styled"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/pro-light-svg-icons"
import { faWindowMaximize } from "@fortawesome/pro-solid-svg-icons"
import { loadScript } from "universal-common-scripts/functions/requests"

class RootIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      popupActive: false
    }
  }
  componentDidMount = async () => {
    /*
     * Contact popup
     */
    await loadScript("/scripts/powr.js")
    // setTimeout(() => {
    //   this.setState({ popupActive: true })
    // }, 2500)
  }
  render() {
    return (
      <Layout location={this.props.location}>
        <Header location={this.props.location} standalone={true} />
        {/*
         * Page content
         */}
        <AboutUs className="content">
          <TitleWithButton>
            <h2>About us:</h2>
            <ContactUsButton
              className="clickable"
              onClick={() => {
                this.setState({ popupActive: true })
              }}
            >
              Contact us <FA icon={faWindowMaximize} className="" />
            </ContactUsButton>
          </TitleWithButton>
          <p>
            A husband and wife team... We are very lucky to share a wonderful relationship. We've worked together for a
            while now, and completed some complex and ambitious tasks. Paul (CTO) has taken care of all technical tasks,
            including project management. Samira (diversity officer) did the more humanistic and linguistic tasks,
            research and sentiment analysis.
          </p>
          <p>&nbsp;</p>
          <AboutUsTable>
            <div className="bio">
              <h3>Paul Shorey</h3>
              <img src="/photos/about-paul-rocks.jpg" />
              <p>
                <b>
                  Paul has worked 11 years with web development and software engineering teams - in NYC, Utah,
                  California, and remotely. Specializing in full-stack Javascript, front-end development, UI/UX, AWS,
                  cloud systems, and other open-source web technologies.
                </b>
              </p>
              <p>
                "I just want to create. I went for a BFA in Media Arts from Hartford Art school, to be an artist, but
                ironically had to teach myself programming and become an engineer to pay for the degree. Still, the
                foundation of art school has given me the skill to capture a vision for a product, then execute on it.
                My corporate and engineering experience has taught me to approach a project with the mindset that
                anything is possible. If a tool is not available, we can create it. This is such a powerful realization.
                I want to share this with the world, and empower the next generation of entrepreneurs and creatives to
                build and succeed! I feel like my past 15 years experience are finaly coming together. It's a very
                exciting time in my life. I hope you join me in this adventure."
              </p>
              <p>
                Learn more about me and see my past work at{" "}
                <a href="http://nlpthesaurus.com" target="_blank">
                  PaulShorey.com
                </a>
              </p>
            </div>
            <div className="bio-spacer"></div>
            <div className="bio">
              <h3>Samira Ali Shorey</h3>
              <img src="/photos/about-paul-rocks.jpg" />
              <p>
                <b>
                  Samira has a Bachelors in Sociology. She speaks Swahili and Mandarin, can read/write Arabic, and is
                  learning Spanish. She has worked for several non-profits around Kansas City, including United Inner
                  City Services, and has even led her own initiatives. Samira has worked as a social media coordinator,
                  graphic designer, researcher, and has worked with an enterprise EHR software company to manage the
                  database and teach health practitioners how to use the product.
                </b>
              </p>
              {/*<p>*/}
              {/*  Having grown up in the inner Kansas City, as a refugee, Samira was always thankful for being in this*/}
              {/*  country, and always wanted to give back. She has started several non-profit programs in her neighborhood*/}
              {/*  and school as an undergraduate. Now, she has been accepted into medical school, Kansas City University*/}
              {/*  of Medicine and Biosciences, and is excited about becoming a healer, and inspiring the next generation*/}
              {/*  to make the most of their lives.*/}
              {/*</p>*/}
              <p>
                Samira's multi-lingual and multi-ethnic expertise has been a tremendous help in making our own{" "}
                <a href="http://nlpthesaurus.com" target="_blank">
                  NLPThesaurus.com
                </a>{" "}
                the best English language thesaurus, and the only one utilizing sentiment analysis. A major reason why
                it's so hard to make a decent domain name suggestion tool (or any NLP AI) is because there are so many
                awkward synonyms. If you type in "black" or "woman" into any thesaurus, like Thesaurus.com or Oxford or
                Webster, you will get very politically incorrect terms. That is the nature of the English language.
                Samira has cleaned up thousands of adjectives, proper nouns, and culturally sensitive terms. Now both
                our{" "}
                <a href="http://nlpthesaurus.com" target="_blank">
                  Thesaurus
                </a>{" "}
                and <Link to="/">Domain Suggestions</Link> can be used without fear of offending any visitors.
              </p>
            </div>
          </AboutUsTable>
          <p>&nbsp;</p>
          <ContactUsButton
            className="clickable"
            onClick={() => {
              this.setState({ popupActive: true })
            }}
          >
            Contact us <FA icon={faWindowMaximize} className="" />
          </ContactUsButton>
          &emsp;Let's discuss the product, the implementation, or just meet!
          <p>&nbsp;</p>
        </AboutUs>
        {/*
         * Contact popup
         */}
        <ContactPopup className={this.state.popupActive ? "active" : "hidden"}>
          <div className="powr-contact-form" id="26cc3624_1592768408" />
          <div
            className="x"
            onClick={() => {
              this.setState({ popupActive: false })
            }}
          >
            <FA icon={faTimes} className="faTimes" />
          </div>
        </ContactPopup>
      </Layout>
    )
  }
}

export default RootIndex
