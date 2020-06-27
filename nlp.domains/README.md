# Name Brain AI - Front End  
  
## NOTE Node.js version  
  
Node.JS version must NOT be higher than 13.12. If higher, then you have to update Webpack dependency versions.  
  
## Setup  
  
`npm install`  
  
- `npm run dev:local` this will serve development environment, using `.env.development` variables  
- `npm run dev:remote` this will serve development environment, using `.env.production` variables  
  This will have to be disabled! Back-end API server shall not accept requests from localhost!  
- `npm run build:local` this will build the production code, but still use`.env.development` variables  
- `npm run build:remote` this will build the production code, and use`.env.production` variables  
  
### process.env.NODE_ENV  
  
**ignore this variable** prefer `process.env.GATSBY_ACTIVE_ENV` instead  
  
### process.env.GATSBY_ACTIVE_ENV = 'development'  
  
1. point API url to local server, on local area network  
2. do not use captcha  
  
### process.env.GATSBY_ACTIVE_ENV = 'production'  
  
1. point API url to remote server, on https://api.whatever.ai  
2. use captcha, send to API with initial endpoint  
   **if successful authentication,** client IP address will be cached, and ignored for all future requests  
   **if failed, will return error,** client can request to API endpoint again, until successful  
  
## Gatsby Platform  
  
See (gatsbyjs.org) to learn about this **"SSR React App website"**  
Watch: ["Building a blazing fast website with GatsbyJS and Contentful"](https://www.youtube.com/watch?v=Ek4o40w1tH4&list=PL8KiuH6vpACV-F7jXribe4YveGBhBeG9A)  
  
# Back-end  
  
`.env.development`: in development (`npm run dev`), call to back-end server on local area network  
`.env.production`: call to remote back-end server  
  
# Future  
  
For enterprise level clients, currently working on a system to  
  
# Notes  
  
## Search.js, props.location.pathname + props.location.search  
  
    Search.js::constructor  
        sets ${word} and ${tld} from url  
  
    Search.js::componentDidMount  
        calls ::validate_inputs and ::process_inputs  
  
    Search.js::validate_inputs  
    Search.js::process_inputs  
        fetch data for ${word} and ${tld}  
  
    Redux word ${input_str} and ${input_tld}  
        are updated when got data for each  
        if inputs have not changed, data will not be gotten again  
  
#### Search.js gets all data, depending on parameters passed to it from page  
  
- every page needs phrase_chunks  
- domains also needs domains, tlds, phrases, wip etc.  
  > So, Search.js always gets phrase_chunks,  
  >  but also gets domains/phrases if `this.props.domains` passed to it from page  
  >  It does so on initial page load, and when user updates input ${word} or ${tld}  
  
#### But what if someone opens `/word?word=one&tld=com` page, then navigates to `/domains?word=one&tld=com` ?  
  
**That shall not be allowed!** There shall be no `<Link to="/domains?word=something" />`.  
Only `<Link to="/domains" />`, to link to Domains homepage. Then user must input and search, to get data.  
Page `/domains?word=something` does get correct data, but only on initial page load, not via React Router Link.  
