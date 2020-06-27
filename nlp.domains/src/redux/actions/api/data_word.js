import { RX__word_phrase } from "src/redux/actions/input"
import { message } from "antd"
import axios from "axios"

const API_HOST = process.env.ADMIN_API_HOST

// export function data_word_get(key) {
//   return () => {
//     return new Promise((resolve, reject) => {
//
//       // get word
//       window.isLoading('word')
//       axios({
//         'method': 'get',
//         'url': API_HOST + '/api/data/word/' + key,
//       })
//         .then((row) => {
//           // got data
//           console.log('row', row)
//           // fix derivations - they need to be fixed like this systematically, but for now this is hotfix:
//           // if (row.derivations && !Array.isArray(row.derivations)) {
//           //   row.derivations = [...new Set(row.derivations.split(',').map(w => w.trim()).filter(w => !!w))]
//           // }
//           // // return
//           // window.doneLoading('word')
//           // resolve(row);
//         })
//         .catch((err) => {
//           message.error(`could not edit key=${key}`, 10)
//           window.doneLoading('word')
//           reject()
//         })
//
//     })
//   }
// }

export function data_word_edit(row) {
  return (dispatch) => {
    // save
    window.isLoading("word")
    return axios({
      method: "put",
      url: API_HOST + "/api/data/word/" + row.key,
      data: row
    })
      .then(() => {
        message.success(`edited word "${row.key}"`)
        // update word
        dispatch(RX__word_phrase())
      })
      .catch((err) => {
        message.error(`could not edit key=${row.key}`, 10)
      })
      .then(() => {
        window.doneLoading("word")
      })
  }
}

export function data_word_sentiment_of_synonym(key, synonym, sentiment) {
  return (dispatch) => {
    // save
    return axios({
      method: "put",
      url: API_HOST + "/api/data/word_sentiment_of_synonym",
      data: { key, synonym, sentiment }
    })
      .then(() => {
        message.success(`edited synonym="${synonym}" sentiment="${sentiment}"`)
        // update word
        dispatch(RX__word_phrase())
      })
      .catch((err) => {
        message.error(`could not edit key=${key}`, 10)
      })
  }
}

export function data_word_proper_of_synonym(key, synonym, proper) {
  return (dispatch) => {
    // save
    return axios({
      method: "put",
      url: API_HOST + "/api/data/word_proper_of_synonym/" + key + "/" + synonym,
      data: { proper }
    })
      .then(() => {
        message.success(`edited synonym="${synonym}" proper="${proper}"`)
        // update word
        dispatch(RX__word_phrase())
      })
      .catch((err) => {
        message.error(`could not edit key=${key}`, 10)
      })
  }
}

export function data_word_add_poswords(key, pos, poswords) {
  return (dispatch) => {
    // prep
    let poslist = poswords.split(",").map((w) => w.trim())
    if (poslist && poslist.length) {
      // save
      return axios({
        method: "put",
        url: API_HOST + "/api/data/word_add_poswords",
        data: { key, pos, poswords: poslist }
      })
        .then(() => {
          message.success(`added poswords="${poswords}" to pos="${pos}"`)
          // update word
          dispatch(RX__word_phrase())
        })
        .catch((err) => {
          message.error(`could not save key=${key}, pos=${pos}, poswords=${poswords}`, 10)
        })
    }
  }
}

export function data_word_remove_words(key, wordsString) {
  return (dispatch) => {
    // prep
    let wordsList = wordsString.split(",").map((w) => w.trim())
    if (wordsList && wordsList.length) {
      // save
      return axios({
        method: "put",
        url: API_HOST + "/api/data/word_remove_words",
        data: { key, words: wordsList }
      })
        .then(() => {
          message.success(`removed poswords="${wordsString}" from key="${key}"`)
          // update word
          dispatch(RX__word_phrase())
        })
        .catch((err) => {
          message.error(`could not save key=${key}, words=${wordsString}`, 10)
        })
    }
  }
}

export function data_word_remove_synonym(key, synonym) {
  return (dispatch) => {
    // save
    return axios({
      method: "put",
      url: API_HOST + "/api/data/word_remove_synonym/" + key + "/" + synonym,
      data: {}
    })
      .then(() => {
        message.success(`removed synonym="${synonym}" from key="${key}"`)
        // update word
        dispatch(RX__word_phrase())
      })
      .catch((err) => {
        message.error(`could not remove synonym="${synonym}" from key="${key}"`, 10)
      })
  }
}

// export function data_word_add_to_others({ addWord, pos, addToOthers }) {
//   window.isLoading('add_to_others')
//   return async (dispatch) => {
//     // save
//     return axios({
//       'method': 'put',
//       'url': API_HOST + '/api/data/word_add_to_others',
//       'data': { addWord, pos, addToOthers },
//     })
//       .then(() => {
//         message.success(`removed synonym="${synonym}" from key="${key}"`)
//         // update word
//         dispatch(RX__word_phrase())
//       })
//       .catch((err) => {
//         message.error(`could not remove synonym="${synonym}" from key="${key}"`, 10)
//       })
//       .then(() => {
//         window.doneLoading('add_to_others')
//       })
//   }
// }
