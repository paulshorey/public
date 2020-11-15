import { str_trim_char } from "./strings.js"

/**
 * Convert JavaScript Object to URL querystring
 * ex: "?one=1&two=something"
 */
export function querystring_from_object(params = {}) {
  let qs = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&")
  if (qs) {
    qs = "?" + qs
  }
  return qs
}

/**
 * Convert URL querystring to JavaScript Object
 * ex: "?one=1&two=something" => {one:1,two:'something'}
 */
export function object_from_querystring(str = "") {
  // make object
  let obj = {}
  let pairs = str.replace("?", "").split("&")
  for (let pair of pairs) {
    if (!pair) continue
    let tuple = pair.split("=")
    let key = tuple[0]
    if (!key) continue
    obj[key] = tuple[1] || ""
  }
  // decode value
  for (let key in obj) {
    obj[key] = decodeURIComponent(obj[key] || "").trim()
  }
  // done
  return obj
}

/**
 * Change a url (GET) parameter in queryString string
 * @param queryString {string} - ex: "?start=10&fruit=apple"
 * @param key {string} - ex: "fruit"
 * @param value {string} - ex: "species"
 * @return {string} - ex: "?start=10&species=apple"
 */
export function queryStringReplaceKeyValue(queryString, key, value) {
  // clean input
  queryString = str_trim_char(queryString, "&")
  queryString = str_trim_char(queryString, "?")
  let obj = JSON.parse(
    '{"' + decodeURI(queryString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
  )
  // replace value
  obj[key] = value
  // rebuild queryString with replaced value
  let output = "?"
  for (let pair of Object.entries(obj)) {
    output += pair[0] + "="
    output += pair[1] + "&"
  }
  return str_trim_char(output, "&")
}
