/**
 * Sort array of strings by separate dictionary of [{string:rating},], and
 * also by position in array. Items at front of array will be rated higher.
 * @param arr {Array.<String>} - array of strings
 * @param rating_key {string} - which property of object to use as sort rating (must be a number)
 * @param multiply_position {number} - make position x times more important than rating
 * @return {Array.<String>} - array of strings
 */
export default function (arr, rating_key, multiply_position = 1) {
  let that = {}

  // rating_key
  that.min_rating = null
  that.max_rating = null
  that.rating_key = rating_key
  for (let obj of arr) {
    let rate = obj[rating_key]
    // compare ratings to each other
    if (that.min_rating === null || rate < that.min_rating) {
      that.min_rating = rate
    }
    if (that.max_rating === null || rate > that.max_rating) {
      that.max_rating = rate
    }
  }
  that.delta_rating = that.max_rating - that.min_rating
  that.median_rating = that.min_rating + (that.delta_rating/2)

  // prepare position
  that.min_index = 0
  that.max_index = arr.length - 1
  for (let i in arr) {
    // count up - first item = 0, last item = (length-1)
    arr[i].index = i
  }
  that.delta_index = that.max_index - that.min_index
  that.multiply_position = multiply_position

  // sort
  return arr.sort(asort_strings_by_rating_and_position__helper.bind(that))
};

// helper function:
function asort_strings_by_rating_and_position__helper(a, b) {

  // higher == better
  // normalized to 0-1 range
  // highest rating gets 1, lowest rating gets 0
  let a_rating = (this.delta_rating - (this.max_rating - (typeof a[this.rating_key]!=='undefined' ? a[this.rating_key] : this.median_rating))) / this.delta_rating
  let b_rating = (this.delta_rating - (this.max_rating - (typeof b[this.rating_key]!=='undefined' ? b[this.rating_key] : this.median_rating))) / this.delta_rating

  // higher == better
  // normalized to 0-1 range
  // lowest index gets 1, highest index gets 0
  // (multiply_position to make position score more important than rating score)
  let a_index = ((this.max_index - a.index) / this.delta_index) * this.multiply_position
  let b_index = ((this.max_index - b.index) / this.delta_index) * this.multiply_position

  // combine the two
  // if b is higher, then sort it closer to front of array compared to a
  return (b_rating + b_index) - (a_rating + a_index)
}
