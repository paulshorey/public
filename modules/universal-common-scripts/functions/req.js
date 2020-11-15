/**
 * Parse and combine POST data and URL params into JavaScript object
 * @param req {object} - IMPORTANT: does not have to be real api request. Can be simple object.
 * @param req.body {object} - key/value pairs, already parsed and ready to use
 * @param req.query {object} - object of key/value pairs from URL query string
 *    This function will decodeURIComponent then parse each value.
 *    These req.query values will override values from req.body!
 * @returns {{}} - combined keys/values. Original request object will NOT be modified.
 */
export const aggregate_req_body_query = function (req) {
  let query = {}
  // body (POST data)
  if (req.body) {
    query = req.body
  }
  // query (URL parameters)
  if (req.query) {
    for (let key in req.query) {
      let val = req.query[key]
      if (val === 0) {
        query[key] = 0
        continue
      }
      if (!val) continue
      val = decodeURIComponent(val).trim()
      if (!val) continue
      if (val === "undefined") {
        query[key] = "undefined"
        continue
      }
      if (val === "null") {
        query[key] = "null"
        continue
      }
      if (val === "true") {
        query[key] = true
        continue
      }
      if (val === "false") {
        query[key] = false
        continue
      }
      if (['"', "{", "["].includes(val[0])) {
        try {
          val = JSON.parse(val)
        } catch (e) {
          val = ""
        }
      }
      query[key] = val
    }
  }
  // combined
  return query
}
