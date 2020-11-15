/**
 * Mix multiple lists of strings into one list, by taking one item from each
 *    Takes unlimited number of arguments, but each must be an array!
 * @params strs1 {array} - array of strings
 * @params strs2 {array} - array of strings
 * @params strs3 {array} - array of strings
 * @returns {array} - new array (immutable), aggregated
 */
export const arr_mix = function (arrays) {
  let master_list = []
  // find length of longest array
  let max_length = 0
  for (let arr of arrays) {
    max_length = Math.max(arr.length, max_length)
  }

  // iterate by index
  // check item at each index in each array
  let index = 0
  while (true) {
    // add one item from each array
    for (let arr of arrays) {
      if (arr[index]) {
        // add item if exists
        master_list.push(arr[index])
      }
    }

    // next index
    index++
    if (index >= max_length) {
      break
    }
  }
  return master_list
}

/**
 * arr.length alternative
 *      actually useful, because it checks for existence of ${arr}
 * @param arr {array}
 * @returns {number}
 */
export const arr_length = function (arr) {
  return arr && arr.length ? arr.length : 0
}

/**
 * Create an array
 */
export const arr_from_value = function (value, len) {
  let arr = []
  for (let i = 0; i < len; i++) {
    arr.push(value)
  }
  return arr
}

/**
 * Subtract array B values from array A. Return remaining array A.
 *      NOTE: first array A must be the main one. Words also appearing in B will be removed
 * @param a {array}
 * @param b {array} - for comparison only. Array values unique to B will be ignored
 * @returns {array} - returns an array of values which appear in A but not B
 */
export const arr_diff = function (a, b) {
  // a: source/destination array
  // b: compare to this
  return a.filter(function (i) {
    return !b.includes(i)
  })
}

/**
 * Remove an item (if exact match string/number) from array
 */
export const arr_remove_item = function (arr=[], item='') {
  return arr.filter(it=>it!==item)
}

/**
 * Similarities between arrays A and B
 * @param a {array}
 * @param b {array}
 * @returns {array} - returns an array with values which appear in both A and B
 */
export const arr_includes = function (a, b) {
  return a.filter(function (i) {
    return b.includes(i)
  })
}

/**
 * Array with empty/falsy values removed.
 * @param arr {array}
 * @returns {array}
 */
export const arr_truthy_values = function (arr) {
  return arr.filter((val) => !!val)
}
