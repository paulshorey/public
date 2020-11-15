/**
 * Flatten a matrix of strings -
 *    - generate list of all unique possible cases, from matrix of strings
 * @params matrix {array} - array of arrays of strings, in a matrix format
 * @returns {array} - array of arrays of strings -
 *    - no longer a matrix, but just lists of phrases (phrase = array of strings)
 */
// export const matrix_flatten_to_arrays = function (matrix) {
//   if (matrix.length === 1) {
//     return matrix[0]
//   } else {
//     let result = []
//     let allCasesOfRest = matrix_flatten_to_arrays(matrix.slice(1)) // recur with the rest of matrixay
//     for (let i = 0; i < allCasesOfRest.length; i++) {
//       for (let j = 0; j < matrix[0].length; j++) {
//         result.push(matrix[0][j] + allCasesOfRest[i])
//       }
//     }
//     return result
//   }
// }
/**
 * Flatten a matrix of strings -
 *    - generate list of all unique possible cases, from matrix of strings
 * @params matrix {array} - array of arrays of strings, in a matrix format
 * @returns {array} - array of combined strings, separated by space
 */
export const matrix_flatten_to_strings = function (matrix) {
  if (!matrix.length) {
    return []
  } else if (matrix.length === 1) {
    return matrix[0]
  } else {
    let result = []
    let allCasesOfRest = matrix_flatten_to_strings(matrix.slice(1)) // recur with the rest of matrixay
    for (let i = 0; i < allCasesOfRest.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        result.push(matrix[0][j] + " " + allCasesOfRest[i])
      }
    }
    return result
  }
}

/**
 * Shuffle some strings
 *    do not allow two strings to repeat which have the same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
export const astrings_shuffle_last_strict = function (strs) {
  let output = []
  let prev_ll = "" // last letter
  let prev_strs_length = 0

  // while loop as long as it takes! (should only be for a few milliseconds)
  while (true) {
    // prevent infinite loop - if strs arr length has not been changed,
    // then we've reached a stalemate - no new items will be used
    if (strs.length === prev_strs_length) {
      break
    } else {
      prev_strs_length = strs.length
    }
    // each while loop, we'll take items out of the strs arr
    for (let i = 0; i < strs.length; i++) {
      // examine current item
      let str = strs[i]
      let ll = str[str.length - 1]
      // if current string starts with different letter than previous string,
      // add it to output. Else, ignore it, to examine it again next iteration
      if (prev_ll !== ll) {
        // add current item to output arr
        output.push(str)
        prev_ll = ll
        // remove current item from input arr
        strs.splice(i, 1)
        i--
      }
    }
  }

  return [...new Set([...output, ...strs])]
}

/**
 * Shuffle some strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
export const astrings_shuffle_first_last_strict = function (strs) {
  let output = []
  let prev_fl = "" // first letter
  let prev_ll = "" // last letter
  let prev_strs_length = 0

  // while loop as long as it takes! (should only be for a few milliseconds)
  while (true) {
    // prevent infinite loop - if strs arr length has not been changed,
    // then we've reached a stalemate - no new items will be used
    if (strs.length === prev_strs_length) {
      break
    } else {
      prev_strs_length = strs.length
    }
    // each while loop, we'll take items out of the strs arr
    for (let i = 0; i < strs.length; i++) {
      // examine current item
      let str = strs[i]
      let fl = str[0]
      let ll = str[str.length - 1]
      // if current string starts with different letter than previous string,
      // add it to output. Else, ignore it, to examine it again next iteration
      if (prev_ll !== ll && prev_fl !== fl) {
        // add current item to output arr
        output.push(str)
        prev_fl = fl
        prev_ll = ll
        // remove current item from input arr
        strs.splice(i, 1)
        i--
      }
    }
  }

  return [...new Set([...output, ...strs])]
}

/**
 * Shuffle list of strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
export const astrings_shuffle_last = function (input_strs = []) {
  let memory_strs = []
  let unique_strs = []

  // console.time("1000 loops")
  let loops = 0
  let old_strs = ""
  infinite_loop: while (loops < 1000) {
    loops++

    // don't waste time on the same value
    let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0]
    if (new_strs === old_strs) {
      break infinite_loop
    }
    old_strs = new_strs

    // no more inputs
    if (!input_strs.length && !memory_strs.length) {
      break infinite_loop
    }

    // first time
    if (!unique_strs.length) {
      unique_strs.push(input_strs.shift())
      continue infinite_loop
    }

    // last added string
    let unique_str = unique_strs[unique_strs.length - 1] || "" // last added
    let unique_str_ll = unique_str[unique_str.length - 1] || ""

    let unique_str2 = unique_strs[unique_strs.length - 2] || "" // 2nd to last added
    let unique_str2_ll = unique_str2[unique_str2.length - 1] || ""

    // insert new str
    // from memory
    if (memory_strs.length) {
      for (let str of memory_strs) {
        if (!str) continue
        let str_ll = str[str.length - 1]
        if (str_ll === unique_str_ll && str_ll === unique_str2_ll) {
          // not unique
          continue
        } else {
          // add unique
          unique_strs.push(memory_strs.shift())
          continue infinite_loop
        }
      }
    }

    // insert new str
    // from input
    if (input_strs[0]) {
      let str = input_strs.shift()
      let str_ll = str[str.length - 1]
      if (str_ll === unique_str_ll && str_ll === unique_str2_ll) {
        // not unique
        memory_strs.push(str)
      } else {
        // add unique
        unique_strs.push(str)
      }
    }
  }
  // console.timeEnd("1000 loops")

  return [...unique_strs, ...memory_strs, ...input_strs]
}

/**
 * Shuffle list of strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
export const astrings_shuffle_first_last = function (input_strs = []) {
  let memory_strs = []
  let unique_strs = []

  // console.time("1000 loops")
  let loops = 0
  let old_strs = ""
  infinite_loop: while (loops < 1000) {
    loops++

    // don't waste time on the same value
    let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0]
    if (new_strs === old_strs) {
      break infinite_loop
    }
    old_strs = new_strs

    // no more inputs
    if (!input_strs.length && !memory_strs.length) {
      break infinite_loop
    }

    // first time
    if (!unique_strs.length) {
      unique_strs.push(input_strs.shift())
      continue infinite_loop
    }

    // last added string
    let unique_str = unique_strs[unique_strs.length - 1] || "" // last added
    let unique_str_fl = unique_str[0] || ""
    let unique_str_ll = unique_str[unique_str.length - 1] || ""

    let unique_str2 = unique_strs[unique_strs.length - 2] || "" // 2nd to last added
    let unique_str2_fl = unique_str2[0] || ""
    let unique_str2_ll = unique_str2[unique_str2.length - 1] || ""

    // insert new str
    // from memory
    if (memory_strs.length) {
      for (let str of memory_strs) {
        if (!str) continue
        let str_fl = str[0]
        let str_ll = str[str.length - 1]
        if (
          (str_fl === unique_str_fl && str_fl === unique_str2_fl) ||
          (str_ll === unique_str_ll && str_ll === unique_str2_ll)
        ) {
          // not unique
          continue
        } else {
          // add unique
          unique_strs.push(memory_strs.shift())
          continue infinite_loop
        }
      }
    }

    // insert new str
    // from input
    if (input_strs[0]) {
      let str = input_strs.shift()
      let str_fl = str[0]
      let str_ll = str[str.length - 1]
      if (
        (str_fl === unique_str_fl && str_fl === unique_str2_fl) ||
        (str_ll === unique_str_ll && str_ll === unique_str2_ll)
      ) {
        // not unique
        memory_strs.push(str)
      } else {
        // add unique
        unique_strs.push(str)
      }
    }
  }
  // console.timeEnd("1000 loops")

  return [...unique_strs, ...memory_strs, ...input_strs]
}

/**
 * Shuffle some strings
 *    do not allow two strings to repeat which have the same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
export const astrings_shuffle_last3_strict = function (strs) {
  let output = []
  let prev_ll = "" // last letter
  let prev_strs_length = 0

  // while loop as long as it takes! (should only be for a few milliseconds)
  while (true) {
    // prevent infinite loop - if strs arr length has not been changed,
    // then we've reached a stalemate - no new items will be used
    if (strs.length === prev_strs_length) {
      break
    } else {
      prev_strs_length = strs.length
    }
    // each while loop, we'll take items out of the strs arr
    for (let i = 0; i < strs.length; i++) {
      // examine current item
      let str = strs[i]
      let ll = str[str.length - 3] + str[str.length - 2] + str[str.length - 1]
      // if current string starts with different letter than previous string,
      // add it to output. Else, ignore it, to examine it again next iteration
      if (prev_ll !== ll) {
        // add current item to output arr
        output.push(str)
        prev_ll = ll
        // remove current item from input arr
        strs.splice(i, 1)
        i--
      }
    }
  }

  return [...new Set([...output, ...strs])]
}

/**
 * Shuffle list of strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
export const astrings_shuffle_first_last_loose = function (input_strs = []) {
  let memory_strs = []
  let unique_strs = []

  // console.time("1000 loops")
  let loops = 0
  let old_strs = ""
  infinite_loop: while (loops < 1000) {
    loops++

    // don't waste time on the same value
    let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0]
    if (new_strs === old_strs) {
      break infinite_loop
    }
    old_strs = new_strs

    // no more inputs
    if (!input_strs.length && !memory_strs.length) {
      break infinite_loop
    }

    // first time
    if (!unique_strs.length) {
      unique_strs.push(input_strs.shift())
      continue infinite_loop
    }

    // last added string
    let unique_str = unique_strs[unique_strs.length - 1] || "" // last added
    let unique_str_fl = unique_str[0] || ""
    let unique_str_ll = unique_str[unique_str.length - 1] || ""

    let unique_str2 = unique_strs[unique_strs.length - 2] || "" // 2nd to last added
    let unique_str2_fl = unique_str2[0] || ""
    let unique_str2_ll = unique_str2[unique_str2.length - 1] || ""

    let unique_str3 = unique_strs[unique_strs.length - 3] || "" // 2nd to last added
    let unique_str3_fl = unique_str3[0] || ""
    let unique_str3_ll = unique_str3[unique_str3.length - 1] || ""

    // insert new str
    // from memory
    if (memory_strs.length) {
      for (let str of memory_strs) {
        if (!str) continue
        let str_fl = str[0]
        let str_ll = str[str.length - 1]
        if (
          (str_fl === unique_str_fl && str_fl === unique_str2_fl && str_fl === unique_str3_fl) ||
          (str_ll === unique_str_ll && str_ll === unique_str2_ll && str_ll === unique_str3_ll)
        ) {
          // not unique
          continue
        } else {
          // add unique
          unique_strs.push(memory_strs.shift())
          continue infinite_loop
        }
      }
    }

    // insert new str
    // from input
    if (input_strs[0]) {
      let str = input_strs.shift()
      let str_fl = str[0]
      let str_ll = str[str.length - 1]
      if (
        (str_fl === unique_str_fl && str_fl === unique_str2_fl && str_fl === unique_str3_fl) ||
        (str_ll === unique_str_ll && str_ll === unique_str2_ll && str_ll === unique_str3_ll)
      ) {
        // not unique
        memory_strs.push(str)
      } else {
        // add unique
        unique_strs.push(str)
      }
    }
  }
  // console.timeEnd("1000 loops")

  return [...unique_strs, ...memory_strs, ...input_strs]
}


/**
 * Shuffle list of strings
 *    do not allow two strings to repeat which have the same first letter or same last letter
 * @params strs {array} - array of strings
 * @returns {array} - new array (immutable), of shuffled strs
 */
export const astrings_shuffle_last3 = function (input_strs = []) {
  let memory_strs = []
  let unique_strs = []

  // console.time("1000 loops")
  let loops = 0
  let old_strs = ""
  infinite_loop: while (loops < 1000) {
    loops++

    // don't waste time on the same value
    let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0]
    if (new_strs === old_strs) {
      break infinite_loop
    }
    old_strs = new_strs

    // no more inputs
    if (!input_strs.length && !memory_strs.length) {
      break infinite_loop
    }

    // first time
    if (!unique_strs.length) {
      unique_strs.push(input_strs.shift())
      continue infinite_loop
    }

    // last added string
    let unique_str = unique_strs[unique_strs.length - 1] || "" // last added
    let unique_str_ll = unique_str[unique_str.length - 1] || ""

    let unique_str2 = unique_strs[unique_strs.length - 2] || "" // 2nd to last added
    let unique_str2_ll = unique_str2[unique_str2.length - 1] || ""

    // insert new str
    // from memory
    if (memory_strs.length) {
      for (let str of memory_strs) {
        if (!str) continue
        let str_ll = str[str.length - 1]
        if (str_ll === unique_str_ll && str_ll === unique_str2_ll) {
          // not unique
          continue
        } else {
          // add unique
          unique_strs.push(memory_strs.shift())
          continue infinite_loop
        }
      }
    }

    // insert new str
    // from input
    if (input_strs[0]) {
      let str = input_strs.shift()
      let str_ll = str[str.length - 1]
      if (str_ll === unique_str_ll && str_ll === unique_str2_ll) {
        // not unique
        memory_strs.push(str)
      } else {
        // add unique
        unique_strs.push(str)
      }
    }
  }
  // console.timeEnd("1000 loops")

  return [...unique_strs, ...memory_strs, ...input_strs]
}



//
// export const astrings_shuffle = function(input_strs, {first=false, last=false, repeat=3, chars=1}) {
//
//   let memory_strs = []
//   let unique_strs = []
//
//   // console.time("1000 loops")
//   let loops = 0
//   let old_strs = ""
//   infinite_loop: while (loops < 1000) {
//     loops++
//
//     // don't waste time on the same value
//     let new_strs = input_strs[0] + memory_strs[0] + unique_strs[0]
//     if (new_strs === old_strs) {
//       break infinite_loop
//     }
//     old_strs = new_strs
//
//     // no more inputs
//     if (!input_strs.length && !memory_strs.length) {
//       break infinite_loop
//     }
//
//     // first time
//     if (!unique_strs.length) {
//       unique_strs.push(input_strs.shift())
//       continue infinite_loop
//     }
//
//     // last string
//     let unique_str = unique_strs[unique_strs.length - 1] || ""
//     let unique_str_fl = unique_str[0] || ""
//     let unique_str_ll = unique_str[unique_str.length - 1] || "" // last character
//     // 2nd last string
//     let unique_str2 = unique_strs[unique_strs.length - 2] || ""
//     let unique_str2_fl = unique_str2[0] || ""
//     let unique_str2_ll = unique_str2[unique_str2.length - 1] || "" // last character
//     // 3rd last string
//     let unique_str3 = unique_strs[unique_strs.length - 3] || ""
//     let unique_str3_fl = unique_str3[0] || ""
//     let unique_str3_ll = unique_str3[unique_str3.length - 1] || "" // last character
//
//     // insert new str
//     // from memory
//     if (memory_strs.length) {
//       for (let str of memory_strs) {
//         if (!str) continue
//         let str_fl = str[0]
//         let str_ll = str[str.length - 1]
//         if (
//           (str_fl === unique_str_fl && str_fl === unique_str2_fl && str_fl === unique_str3_fl) ||
//           (str_ll === unique_str_ll && str_ll === unique_str2_ll && str_ll === unique_str3_ll)
//         ) {
//           // not unique
//           continue
//         } else {
//           // add unique
//           unique_strs.push(memory_strs.shift())
//           continue infinite_loop
//         }
//       }
//     }
//
//     // insert new str
//     // from input
//     labeled_if:
//     if (input_strs[0]) {
//       let str = input_strs.shift()
//       let str_fl = str[0]
//       let str_ll = str[str.length - 1]
//       if (
//         (str_fl === unique_str_fl && str_fl === unique_str2_fl && str_fl === unique_str3_fl) ||
//         (str_ll === unique_str_ll && str_ll === unique_str2_ll && str_ll === unique_str3_ll)
//       ) {
//         // not unique
//         memory_strs.push(str)
//       } else {
//         // add unique
//         unique_strs.push(str)
//       }
//     }
//   }
//
//   return [...unique_strs, ...memory_strs, ...input_strs]
// }