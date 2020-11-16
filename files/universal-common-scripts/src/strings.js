export const str_hash = function (str) {
  let hash = 0
  if (str.length === 0) {
    return hash
  }
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash+''
}

export const str_capitalize = function (word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const str_sanitize_loosely = function (word) {
  return word
    .replace(/_-/g, " ")
    .replace(/[^\w ]+/g, "")
    .toLowerCase()
    .trim()
}
export const str_sanitize_strictly = function (word) {
  return word
    .replace(/[^\w]+/g, "")
    .toLowerCase()
    .trim()
}

export const str_insert = function (string = "", index = 0, insert = "") {
  return string.substring(0, index) + insert + string.substring(index, string.length)
}

/**
 * Trim a character other than whitespace
 * @param s {string} - string
 * @param c {string} - remove this character (or characters) from start/end
 * @returns {void | string}
 */
export const str_trim_char = function trim(s, c) {
  if (c === "]") c = "\\]"
  if (c === "\\") c = "\\\\"
  return s.replace(new RegExp("^[" + c + "]+|[" + c + "]+$", "g"), "")
}

/**
 * Trim all non-alphabetical (not a-zA-Z) characters
 * @param str {string} - string
 * @returns {string}
 */
export const str_trim_non_alpha = function trim(str) {
  return str.replace(new RegExp("^[^a-z]+|[^a-z]+$", "gi"), "")
}

export const str_syllables_count = function str_syllables_count(word) {
  word = word.toLowerCase() //word.downcase!
  if (word.length <= 3) {
    return 1
  } //return 1 if word.length <= 3
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "") //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
  word = word.replace(/^y/, "") //word.sub!(/^y/, '')
  let match = word.match(/[aeiouy]{1,2}/g)
  return match ? match.length : 0 //word.scan(/[aeiouy]{1,2}/).size
}
