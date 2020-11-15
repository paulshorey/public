export const syllable_count = function syllable_count(str) {
  if (!str) return 0
  let original = str
  str = str.replace("ue", "e")
  str = str.substr(0, str.length - 1)
  str = str.replace(/[^aeiouy]+/g, " ")
  let words = str
    .split(" ")
    .map((w) => w.trim())
    .filter((w) => !!w)
  let syllables = words.length
  return syllables === 0 ? original.length : syllables
}
export const is_vowel = function syllable_count(str) {
  return ["a", "e", "i", "o", "u", "y"].includes(str)
}
export const ends_in_vowel = function syllable_count(str) {
  return ["a", "e", "i", "o", "u", "y"].includes(str[str.length-1])
}
