import { parse_axios_error } from "universal-common-scripts/functions/requests"
import { message } from "antd"
import axios from "axios"

const DEVELOPMENT = process.env.GATSBY_ACTIVE_ENV === "development"

const API_HOST = process.env.PUBLIC_API_HOST
const API_HEADERS = DEVELOPMENT
  ? {}
  : {
      "content-type": "application/json",
      "x-rapidapi-host": "name-brain-ai-dev1.p.rapidapi.com",
      "x-rapidapi-key": "11dc13858emshc2393c506bb7d52p12d7e3jsnc48d54772625"
    }

export function data_domains_availability(doms) {
  return () => {
    return new Promise((resolve) => {
      if (doms && doms.length) {
        axios({
          method: "post",
          url: API_HOST + "/v1/domains_availability",
          data: { domains: doms },
          headers: API_HEADERS
        })
          .then((results) => {
            /*
             * which data
             * expecting server response to have data key
             * but Axios puts its response into data key also
             */
            if (results.data && results.data.data) {
              resolve(results.data.data) // correct
            } else {
              console.warn('server response did not have "data" key')
              resolve(results.data)
            }
          })
          .catch((err) => {
            message.error(parse_axios_error(err), 10)
          })
          .then((idk) => {
            /*
             * done loading
             */
            window.doneLoading("data")
          })
      } else {
        resolve()
      }
    })
  }
}

export function domain_suggestions(options = {}) {
  return () => {
    if (!options || !options.phrase) {
      return
    }
    return new Promise((resolve) => {
      /*
       * start loading
       */
      window.isLoading("data")

      axios({
        method: "post",
        url: API_HOST + "/v1/phrase/" + options.phrase,
        data: { ...options, adminKey: process.env.ADMIN_ACCESS_KEY },
        headers: API_HEADERS
      })
        .then((results) => {
          /*
           * which data
           * expecting server response to have data key
           * but Axios puts its response into data key also
           */
          if (results.data && results.data.data) {
            resolve(results.data.data) // correct
          } else {
            console.warn('server response did not have "data" key')
            resolve(results.data)
          }
        })
        .catch((err) => {
          message.error(parse_axios_error(err), 10)
        })
        .then((idk) => {
          /*
           * done loading
           */
          window.doneLoading("data")
        })
    })
  }
}
