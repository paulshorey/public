import { apiGET } from "universal-common-scripts/functions/requests"
import { json_parse } from "universal-common-scripts/functions/objects"

const API_HOST = process.env.ADMIN_API_HOST

/*
 * THIRDPARTY
 */
export function definitions_list_get(key) {
  return async () => {
    // get word
    let row = await apiGET(API_HOST + "/api/oxford/definition/" + key)
    if (row) {
      // success
      row = json_parse(row)
      return row
    }
    // fail
    return false
  }
}
