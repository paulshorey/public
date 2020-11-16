/**
 * NOT [].sort(). Simply combines multiple arrays, one item from each array at a time.
 * Like taking two decks of cards, and making one double deck, by taking one card at a time from each deck.
 * But can be more than 2 arrays! Pass in as many as needed. Will take one item from each, at a time.
 * @param arr1 {Array.<String>} - array of strings
 * @param arr2 {Array.<String>} - array of strings
 * @return {Array.<String>} - array of strings, combined!
 */
export default function asort_strings_combine_lists(arr1, arr2) {
  let list = new Set();

  /*
   * setup pointers (will be incremented each time new item is taken from array)
   */
  let ai = {};
  for (let i in arguments) {
    // will be incremented (ai[i]++) before each use
    ai[i] = -1; // on first use will === 0
  }

  /*
   * iterate all passed-in arrays, one by one, take one new item at a time
   */
  for (let y = 0; y < 50; y++) {
    for (let i in arguments) {
      let arr = arguments[i];
      let str = arr[ai[i]++];
      if (str) {
        list.add(str)
      }
    }
  }

  // console.log('asort_strings_combine_lists list', list);
  return [...list];
  // return arr1;

}

