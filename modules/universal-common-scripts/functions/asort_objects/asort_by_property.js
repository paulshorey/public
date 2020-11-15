/**
 * Sort array of objects - by property value in each object
 * @param arr {Array.<Object>} - array of objects
 * @param prop1_key {object} - property key name to sort by - each object in array must contain this
 * @param prop1_asc {boolean} - by default, will sort prop1 DESC, but if this is true, will sort ASC
 * @return {Array.<Object>} - array of objects, sorted
 */
export default function asort_objects_by_property(arr, prop1_key, prop1_asc = false) {
  return arr.sort(asort_objects_by_property__helper.bind({ arr, prop1_key, prop1_asc }));
};

// helper function:
function asort_objects_by_property__helper(a, b) {
  // sort by rating
  let a_rating = a[this.prop1_key];
  let b_rating = b[this.prop1_key];
  // sort order
  if (this.prop1_asc) {
    // prefer lower number
    // if b is lower, then rate it better than a
    return a_rating - b_rating;
  } else {
    // prefer higher number
    // if b is higher, then rate it better than a
    return b_rating - a_rating;
  }
}

