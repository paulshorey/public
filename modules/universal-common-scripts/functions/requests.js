import { querystring_from_object } from "./urls.js"

/**
 * Parse Axios error message
 * @param {object} error - error can come in multiple formats, but always an object
 * @returns {string} - logs full error, but returns nice readable text for UI alert
 */
export const loadScript = function (source, beforeEl, async = true, defer = true) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script")
    const prior = beforeEl || document.getElementsByTagName("script")[0]

    script.async = async
    script.defer = defer

    function onloadHander(_, isAbort) {
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        script.onload = null
        script.onreadystatechange = null
        script = undefined

        if (isAbort) {
          reject()
        } else {
          resolve()
        }
      }
    }

    script.onload = onloadHander
    script.onreadystatechange = onloadHander

    script.src = source
    prior.parentNode.insertBefore(script, prior)
  })
}

/**
 * Parse Axios error message
 * @param {object} error - error can come in multiple formats, but always an object
 * @returns {string} - logs full error, but returns nice readable text for UI alert
 */
export const parse_axios_error = function (error) {
  // parse data from AJAX:
  let data = (error.response && error.response.data && error.response.data.error) || error
  // which format is data?
  if (typeof data === 'object') {
    // array or object
    let message = data[0] || data.message;
    // log to console
    if (typeof console !== "undefined") console.error("axios error", message)
    // return to app
    return message
  } else {
    // string or unknown
    let message = data
    // log to console
    if (typeof console !== "undefined") console.error("axios error", message)
    // return to app
    return message
  }
}

/**
 * GET request
 * @param {string} url
 * @param {object} data
 * @returns {Promise}
 */
export const apiGET = function (url = ``, data = {}) {
  // Auth
  // url = url;
  // Default options are marked with *
  return fetch(url + querystring_from_object(data), {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  })
    .then((response) => response.json()) // parses response to JSON
    .then((response) => response.data)
}

/**
 * POST request
 * @param {string} url
 * @param {object} data
 * @returns {Promise}
 */
export const apiPOST = function (url = ``, data = {}) {
  // Auth
  // url = url;
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then((response) => response.json()) // parses response to JSON
}

/**
 * PUT request
 * @param {string} url
 * @param {object} data
 * @returns {Promise}
 */
export const apiPUT = function (url = ``, data = {}) {
  // Auth
  // url = url;
  // Default options are marked with *
  return fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json; charset=utf-8"
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then((response) => response.json()) // parses response to JSON
}
