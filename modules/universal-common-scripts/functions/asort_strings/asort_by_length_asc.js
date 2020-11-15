/**
 * Sort array by string length, ascending (or descending with false flag)
 * @param arr {Array<String|Number|Array>}
 * @param desc {boolean} - if true, will sort descending; default is false, ascending
 * @returns {array}
 */
export default function asort_by_length_asc(arr, desc = false) {
  if (desc) {
    return arr.sort((a, b) => b.toString().length - a.toString().length)
  } else {
    return arr.sort((a, b) => a.toString().length - b.toString().length)
  }
};