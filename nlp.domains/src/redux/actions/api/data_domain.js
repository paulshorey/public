import { apiGET, apiPUT, apiPOST } from "universal-common-scripts/functions/requests"
import { json_parse } from "universal-common-scripts/functions/objects"

import { message } from "antd"

const API_HOST = process.env.ADMIN_API_HOST

export function data_domains_all(key) {
  window.isLoading("domains")
  return async (dispatch) => {
    // get word
    let row = await apiGET(API_HOST + "/api/data/domains")
    if (row) {
      // success
      row = json_parse(row)
      window.doneLoading("domains")
      return row
    }
    // fail
    window.doneLoading("domains")
    return false
  }
}

export function data_domain_syns_dict(key) {
  window.isLoading("domain")
  return async (dispatch) => {
    // get word
    let data = await apiGET(API_HOST + "/api/data/domain_syns_of_syns/" + key)
    if (data) {
      // success
      setTimeout(() => {
        window.doneLoading("domain")
      }, 500)
      return data
    }
    // fail
    window.doneLoading("domain")
    return false
  }
}

export function data_domain_get(key) {
  window.isLoading("domain")
  return async (dispatch) => {
    // get word
    let row = await apiGET(API_HOST + "/api/data/domain/" + key)
    if (row) {
      // success
      row = json_parse(row)
      window.doneLoading("domain")
      return row
    }
    // fail
    window.doneLoading("domain")
    return false
  }
}

export function data_domain_edit(row) {
  window.isLoading("domain")
  // validate
  if (!Array.isArray(row.syns1)) {
    row.syns1 = (row.syns1 || "")
      .split(",")
      .map((w) => w.trim())
      .filter((w) => !!w)
  }
  return async (dispatch, getState) => {
    // save
    let res = await apiPUT(API_HOST + "/api/data/domain/" + row.key, row)
    if (res) {
      // ui alert
      message.success(`edited domain "${row.key}"`)
      window.isLoading("domain")
      return res
    }
    window.isLoading("domain")
    return false
  }
}
