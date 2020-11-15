/**
 * Sort array of strings by separate dictionary of [{string:rating},], and
 * also by position in array. Items at front of array will be rated higher.
 * @param arr {Array.<String>} - array of strings
 * @param ratings {object} - dictionary of {string:rating}
 *      ratings does not have to contain an entry for each arr item
 *          if missing, will be given default 0
 *      likewise, it may contain more entries than arr,
 *          extras will be ignored
 * @param multiply_position {number} - make position x times more important than rating
 * @return {Array.<String>} - array of strings
 */
export default function asort_strings_by_rating_and_position(
  arr,
  ratings,
  multiply_position = 1
) {
  let that = {}

  // ratings
  that.min_rating = null
  that.max_rating = null
  that.ratings = ratings
  for (let str in ratings) {
    let rate = ratings[str]
    // compare ratings to each other
    if (that.min_rating === null || rate < that.min_rating) {
      that.min_rating = rate
    }
    if (that.max_rating === null || rate > that.max_rating) {
      that.max_rating = rate
    }
  }
  that.delta_rating = that.max_rating - that.min_rating
  that.median_rating = that.min_rating + that.delta_rating / 2

  // prepare position indexes
  that.min_index = 0
  that.max_index = arr.length - 1
  that.indexes = {}
  for (let i in arr) {
    // count up - first item = 0, last item = (length-1)
    let string = arr[i]
    that.indexes[string] = i
  }
  that.delta_index = that.max_index - that.min_index
  that.multiply_position = multiply_position

  // sort
  return arr.sort(asort_strings_by_rating_and_position__helper.bind(that))
}

// helper function:
function asort_strings_by_rating_and_position__helper(a, b) {
  // higher == better
  // normalized to 0-1 range
  // highest rating gets 1, lowest rating gets 0
  let a_rating =
    (this.delta_rating -
      (this.max_rating - (typeof this.ratings[a] !== "undefined" ? this.ratings[a] : this.median_rating))) /
    this.delta_rating
  let b_rating =
    (this.delta_rating -
      (this.max_rating - (typeof this.ratings[b] !== "undefined" ? this.ratings[b] : this.median_rating))) /
    this.delta_rating

  // higher == better
  // normalized to 0-1 range
  // lowest index gets 1, highest index gets 0
  // (multiply_position to make position score more important than rating score)
  let a_index = ((this.max_index - this.indexes[a]) / this.delta_index) * this.multiply_position
  let b_index = ((this.max_index - this.indexes[b]) / this.delta_index) * this.multiply_position

  // combine the two
  // if b is higher, then sort it closer to front of array compared to a
  return b_rating + b_index - (a_rating + a_index)
}
