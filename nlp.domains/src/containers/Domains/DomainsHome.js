import React from "react"
import { DomainsHomeStyled } from "./DomainsHome.styled"
import Search from "../../components/Search"
import { ___, __, _ } from "./Domains"
import { Link } from "gatsby"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faWindowMaximize } from "@fortawesome/pro-solid-svg-icons"
import { ContactUsButton } from "../../contact.styled"

const results = {
  "simplesolutions.com": [
    "simplesolutions.com",
    "simplesolutions.net",
    "softwaresolutions.app",
    "simplesolutions.info",
    "supersimple.dev",
    "fluidio.co",
    "easysolutions.dev",
    "resulta.ai",
    "outputio.co",
    "starkio.com",
    "honesto.ai",
    "simplekeys.co",
    "fixing.ly",
    "puresolutions.ai"
  ],
  "startupmagazine.com": [
    "kickio.co",
    "startupzine.io",
    "startupmagazine.tech",
    "startupmagazine.ai",
    "bulletin.business",
    "initiation.digital",
    "sparkio.co",
    "startmag.io",
    "publica.ltd",
    "dailyinitiate.com",
    "launchmag",
    "slicklaunch.pub",
    "starting.ink",
    "kickzine.com",
    "startio.co",
    "startly.co",
    "publication.capital"
  ],
  "idea.co": [
    "hintly.ai",
    "minda.co",
    "notioning.co",
    "mindio.ai",
    "thought.info",
    "notion.vision",
    "thoughtio.co",
    "intenta.app",
    "dreamy.app"
  ],
  "teachinthailand.travel": [
    "teachinthailand.travel",
    "teachinthailand.study",
    "teachinthailand.holiday",
    "teach.holiday",
    "teachio.co",
    "instruct.world,"
  ],
  "freshfood.organic": [
    "freshfood.organic",
    "freshfood.cafe",
    "cuisine.cafe",
    "brisk.organic",
    "pristine.cafe",
    "freshchow.organic",
    "rawfood.farm",
    "smartfood.organic",
    "crispo.cafe",
    "organica.eco",
    "goodfood.farm",
    "snacka.ai",
    "nourishment.cafe",
    "feastio.io"
  ],
  "visitNY.travel": [
    "visitny.travel",
    "visitny.tours",
    "comevisit.tours",
    "visitny.global",
    "visitnyc.global",
    "vacaynyc.holiday"
  ],
  "pikespeakcafe.com": [
    "pikespeak.cafe",
    "pikespeakcafe.com",
    "pikes.bar",
    "crescendo.coffee",
    "elevation.haus",
    "mountio.bar",
    "pikespeakcoffee.shop"
  ],
  "cuteclothes.fashion": [
    "cuteclothes.fashion",
    "threadio.co",
    "cuteclothes.design",
    "cuddly.style",
    "lovely.style",
    "artful.style",
    "enchantio.com",
    "prettycute.design",
    "charming.style",
    "garmentio.co",
    " cutelittle.style,"
  ]
}

const styles = {
  titleH2: {
    fontSize: "1.81rem",
    lineHeight: "2.2rem",
    marginBottom: "0",
    fontWeight: "600",
    color: "var(--color-white)"
  },
  titleSup: {
    fontSize: "1rem",
    lineHeight: "1.6rem",
    marginBottom: "0.05rem",
    fontWeight: "600",
    color: "var(--color-subtle-transparent)"
  }
}

const DomainsHome = function (props) {
  /*
   * User "container" state/props/methods!
   * This "child" component is to simplify container's render() logic.
   */
  let that = props.that

  return (
    <DomainsHomeStyled>
      <Search
        {...that.props}
        autofocus={true}
        className={"Search SearchHome"}
        domains={true}
        title={[
          // <div key="0" className="cue">
          //   Use Natural Language Processing (AI) to
          // </div>,
          <div key="1" style={styles.titleH2}>
            Find an Available Domain Name:
          </div>
        ]}
        placeholder="..."
        home={true}
        cue={[
          <div key="3">
            <span>Sentiment analysis,markov strings, word hacks, roots, plurals, abbr.,&nbsp;</span>
          </div>,
          <div key="1">
            <span className="">
              <span className="color-accent u clickable" onClick={that.props.ui_actions.RX__focusSelectTld}>
                1000+ TLDs,
              </span>
              &thinsp;&thinsp;and a{" "}
              <Link to="/word" className="color-accent u">
                custom thesaurus
              </Link>{" "}
              of 500,000+ related words...
            </span>
          </div>
        ]}
      />
      <div className="container">
        {/*<div className="opening_statement">*/}
        {/*  <p className="content">*/}
        {/*    <strong>Triple your domain sales!</strong> Show your visitors only{" "}*/}
        {/*    <strong> relevant available names </strong>*/}
        {/*    they might actually buy!*/}
        {/*  </p>*/}
        {/*</div>*/}
        {/*<div className="opening_statement">*/}
        {/*  <p className="content">*/}
        {/*    /!*<b>Welcome to our Alpha release!</b>&thinsp;&thinsp;Our product is already&nbsp;<a href="">the best</a>, but*!/*/}
        {/*    /!*is still in developent, and improving every day.*!/*/}
        {/*    /!*<br />*!/*/}
        {/*    /!*🙏 Please try it, and&nbsp;*!/*/}
        {/*    /!*<b>*!/*/}
        {/*    /!*  <a href="">give us some feedback</a>.*!/*/}
        {/*    /!*</b>*!/*/}
        {/*    /!*&nbsp;Or,&nbsp;*!/*/}
        {/*    /!*<b>*!/*/}
        {/*    /!*  <a href="">sign up</a>*!/*/}
        {/*    /!*</b>*!/*/}
        {/*    /!*&nbsp;to be notified when the API is ready to use in production.*!/*/}
        {/*  </p>*/}
        {/*</div>*/}
        <div className="background">
          <article className="content">
            <br />

            <h3 className="attention">Finally, a useful suggestions tool!</h3>
            <p>
              We do not just prepend/append random words. We do not just add domain hacks. <br />
              We use{" "}
              <a
                href="https://becominghuman.ai/a-simple-introduction-to-natural-language-processing-ea66a1747b32"
                target="_blank"
              >
                Natural Language Processing (NLP)
              </a>{" "}
              to understand word relationships. We generate new words and phrases, and match them with the most relevant
              TLDs. We filter out offensive and negative synonyms.{" "}
              <strong className="color-attention-dark">No offensive results!</strong>
            </p>
            {/*<p>*/}
            {/*  <b>Already showing available alternatives? </b>*/}
            {/*  You can probably do much much better! 😅*/}
            {/*  <br />*/}
            {/*  <a href="">*/}
            {/*    Compare <>our suggestions</> &thinsp;to <> some popular registrar search results</>*/}
            {/*  </a>*/}
            {/*</p>*/}
            <p>
              Please let us know what worked for you, and what didn't. We're still testing and improving it. With your
              feedback, we can make it perfect for your use case, for your site and your customers.
            </p>
            <p>
              <strong className="color-attention-dark">Increase your conversion rates and domain sales $$$ </strong>
              by offering your visitors available alternatives they will actually buy!
              {/*<span className="nowrap"> 💵 💵 💵</span>*/}
            </p>
            <p>
              <ContactUsButton
                className="clickable"
                onClick={() => {
                  that.setState({ popupActive: true })
                }}
              >
                Contact us <FA icon={faWindowMaximize} className="" />
              </ContactUsButton>
              &emsp;We're a USA team. Lets meet and discuss the possibilities. 🤙
            </p>
            <hr />
            <h3 className="attention">
              <span>We're new, and different!</span>
            </h3>
            <p className="color-medium">
              Below, click the links below to see sample results - compare to Domainr, DomainsBot, and the search
              results of several popular registrars:
            </p>
            <p className="color-medium examples">
              {Object.entries(results).map((tuple, ti) => {
                let key = tuple[0]
                let list = tuple[1]
                return (
                  <span key={key} className="block">
                    <Link to="/?str=yummy recipes&tld=com">{key}</Link>&ensp;&ndash;&ensp;
                    {list.map((result, ri) => {
                      if (ri + 1 >= 7) return null
                      return (
                        <span key={ri}>
                          <b>{result}</b>
                          {ri + 1 !== list.length ? "," : null}
                          &ensp;
                        </span>
                      )
                    })}
                    ...
                  </span>
                )
              })}
            </p>
            <p>
              <strong>It's almost finished! </strong>Please do tell us which search terms did not give you great
              results.
              <br />
              Please tell us what features you would like to have. We can probably make it happen!
            </p>
            <hr />
            <h3 className="attention">
              <span>Utilize all the TLDs:</span>
            </h3>
            <p className="color-medium">
              You control which TLDs to use,
              <strong>&nbsp;and which to promote</strong>! <br />
              We detect the category and meaning of the user's search term, and use the corresponding words and TLDs.
            </p>
            <p className="color-medium">
              <b>nTLDs + gTLDs</b> = we will find all the extensions which are
              <strong> relevant and meaningful </strong>to the user's search term, sorted by relevance. Then, we'll
              promote the ones you prefer, intelligently, organically. You can change your preferences anytime. It's
              part of the API. You can promote ".co" because you think it will sell, or ".wiki" because you own it...
              just give each TLD a numerical rating.
            </p>
            <p className="color-medium">
              <b>ccTLDs</b> = we know that ".ai" means Artificial Intelligence, ".io" is used by tech startups, etc. We
              will treat these the same as all TLDs - detect their meaning, and include when relevant and meaningful,
              again according to your rating. But also, optionally, we'll create domain hacks and word endings, out of
              all the TLDS which your registrar supports.
            </p>
            <br />

            <ul>
              <li>
                <h4>Name suggestions? Or TLD suggestions?</h4>
                <p>Our API gives you both. You choose how to group and display the content on your site.</p>
                <br />
                <p>
                  This service matches the most relevant TLDs to the user's query, better than any other. Our API gives
                  you the best extensions, most optimized for your profit and the most useful for the user. So, the user
                  will find something they like, and not give up in frustration.
                </p>
                <br />
                <p>
                  <b>Example:</b> User searches for "<b>tasty food.com</b>". The .com is not available.
                </p>
                <p>
                  So, you can suggest alternative TLDs like "<b>.menu</b>", "<b>.recipes</b>", "<b>.cooking</b>", "
                  <b>.love</b>", "<b>.cafe</b>", "<b>.kitchen</b>", "<b>.pub</b>", "<b>.catering</b>", etc. Instead of
                  making the user sift through hundreds of extensions, we pick out the most relevant ones. You can mix
                  in some of your favorites, like ".co, .ai, .io, .xyz", but it's important to show mostly releveant
                  suggestions, to keep the user intrigued. Show: <b>delicious&thinsp;.recipes</b>", "
                  <b>gourmet&thinsp;.cafe</b>", "<b>delicio&thinsp;.us</b>", "<b>yummy&thinsp;.recipes</b>", "
                  <b>savory&thinsp;.kitchen</b>
                  ", "<b>organic&thinsp;.cooking</b>", "<b>flavorful&thinsp;.fun</b>", "<b>tastiest&thinsp;.cooking</b>
                  ", "<b>smorgasburg&thinsp;.pub</b>", "<b>gourmet&thinsp;.love</b>
                  ", "<b>delicious&thinsp;.menu</b>", "<b>baking&thinsp;.recipes</b>", "
                  <b>flavorful&thinsp;cooking&thinsp;.kitchen</b>", etc.
                </p>
                <br />
                <p>
                  Our service gives you hundreds of such suggestions, sorted by relevance. You can customize the
                  details, like phrase length, popularity, and set which TLDs to use, promote, or demote. There will
                  always be something your customer will find useful. So, they may actually buy a domain, or at least
                  keep browsing!
                </p>
                <p>
                  <b>Higher engagement, higher retention, higher conversion = more $$$!</b>
                </p>
                <p>There is no other service right now that does this, accurately.</p>
                <br />
                <p>
                  <b>You can even choose which TLDs to promote!</b> We will only show suggestions relevant to the user,
                  nothing random. But out of those, you can choose which are more beneficial to you, to promote to the
                  top of the list.
                </p>
              </li>
              <li>
                <h4>This one is different.</h4>
                <p>This is the most advanced tool for generating domain name suggestions, and matching related TLDs.</p>
                <p>
                  We're still improving every day. These are currently the best generated domain suggestions. Sedo.com
                  also has good ones, but they do not generate new phrases. They search their existing database of
                  listings. We generate new words and phrases, and utilize all possible TLD extensions, to find new,
                  available domains.
                </p>
                {/*<p>*/}
                {/*  <a href="">See all features - current and in-development</a>*/}
                {/*</p>*/}
              </li>
              <li>
                <h4>Word hacks / Domain hacks</h4>
                <p>
                  Our algorithm finds creative word and domain hacks - like turning "panorama.com" into "panoramio.com",
                  "panoram.io", "pictur.es", "panoramica.com", "panorami.ca", "photographio.com", or "photograph.io".
                </p>
                <p>But that's not all we do! This is just one out of many techniques...</p>
              </li>
              <li>
                <h4>Related words</h4>
                <p>We compiled a proprietary collection of 330,000+ words and phrases! A corpus of 10,000,000+</p>
                <p>
                  Our part-of-speech tagging and root-word extraction algorithms are more accurate than in any other
                  linguistics API, so our results stay relevant even when we get creative - like using "synonyms of
                  synonyms of synonyms", or turning a word into its root form and appending a different suffix.
                </p>
              </li>
              <li>
                <h4>Sentiment analysis AI</h4>
                <p>Nothing offensive, no hurt feelings!</p>
                <p>
                  When the customer types in <b>"black"</b> - we don't show them &nbsp;<b>"pickaninny"</b>,{" "}
                  <b>"evil"</b>, or <b>"contraband"</b>
                  .
                  <br />
                  When the customer types in <b>"woman"</b> - we don't show <b>"cleaning"</b>, even though it may be
                  relevant sometimes. If you think it's too strict, you can turn "safe search" off, or make it less
                  aggressive.
                </p>
                <p>
                  We have cleaned our thesaurus automatically, using <strong>IBM Watson</strong> sentiment analysis, and
                  our own algorithms - then manually, using our advanced custom-built editing tools.
                </p>
              </li>
              <li>
                <h4>Markov strings</h4>
                <p>We have developed some clever algorithms, to arrange words in unique but meaningful ways.</p>
                <p>
                  Markov strings are combinations like "adjective -> noun". This one for example, often sounds good for
                  a business name. We use them not just to create new phrases, but detect which words are most important
                  in the user's query.
                </p>
              </li>
              <li>
                <h4>Before/after + Microsoft Bing Web Search</h4>
                <p>
                  We have aggregated content from the open-source DataMuse library. Plus, read the next paragraph to
                  learn about our option to enrich our before/after algorithm, with live web search data from Microsoft
                  Bing.
                </p>
                <p>
                  Coming soon - an option to include the latest Bing web-search content, to find relevant before/after
                  words. So, our suggestions will not just get words from a dictionary, but socially up-to-date
                  locations, names, and pop culture terms!
                </p>
              </li>
              <li>
                <h4>Microsoft Azure spell check</h4>
                <p>
                  With our "spell check" option turned on, you will have access to Microsoft Azure API. This takes a bit
                  of additional time to fetch over the internet. We host our servers very close to Microsoft Azure data
                  centers, for an optimized response time.
                </p>
                <p>
                  If you don't subscribe to the "spell check", then we will not spell check your query. But we will
                  still break the user's query string "stylishfashionista.boutique" into distinct words "stylish +
                  fashionista + .boutique", and even consider alternatives for added meaning "style + fashion +
                  boutiques/shop".
                </p>
              </li>
              <li>
                <h4>Enterprise ready</h4>
                <p>
                  You can actually host our API on your own servers and data centers, to avoid any internet requests -
                  for even faster response times! No more requests over the internet. Get your results instantly, rather
                  than a few hundred milliseconds. This option would require an unlimited license, and some custom
                  development.
                </p>
              </li>
            </ul>

            <h3>Beat your competition</h3>
            <p>
              You can be one of the first in the industry to use this tool - and even tell us what features are most
              important to you.
              <br />
              We imagine that the bigger registrars may insist on an exclusive contract. Hurry up and get yours before
              it's too late!
              {/*<br />*/}
              {/*<a href="">See all features and options</a>*/}
            </p>
            <br />

            {/*<h3>*/}
            {/*  <span>Try it</span>*/}
            {/*</h3>*/}
            {/*<p>*/}
            {/*  <a*/}
            {/*    // className="h-text-scroll-up"*/}
            {/*    onClick={() => {*/}
            {/*      window.document.body.querySelector('input').focus()*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <FA*/}
            {/*      icon={faArrowUp}*/}
            {/*      className="faArrowUp"*/}
            {/*      style={{ transform: 'scale(0.85)' }}*/}
            {/*    />{' '}*/}
            {/*    scroll to top*/}
            {/*  </a>*/}
            {/*</p>*/}
            {/*<br />*/}

            <h3>Easy to integrate...</h3>
            <p>
              Our API uses modern standards (JSON/REST). It is very easy to use. Copy-and-paste code examples coming
              soon.
              <br />
              If you need help with integration, we have <b>11+ years experience</b> in web development and UI design.
              {/*<br />*/}
              {/*<a href="">Contact us</a>*/}
            </p>

            <br />

            <p>
              <span className="color-light">
                We are a <b className="color-medium">USA team</b> of husband and wife, available to meet anytime.{" "}
                <Link to="/contact">About us &raquo;</Link>
                <br />
                Currently focusing on this full time. This service will be ready to integrate in August.
              </span>
              <hr />
              <ContactUsButton
                className="clickable"
                onClick={() => {
                  that.setState({ popupActive: true })
                }}
              >
                Contact us <FA icon={faWindowMaximize} className="" />
              </ContactUsButton>
              &emsp;Learn more about us, and the product.
              <hr />
            </p>

            <br />
          </article>
        </div>
      </div>
    </DomainsHomeStyled>
  )
}

export default DomainsHome
