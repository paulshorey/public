import asort_by_extension from "./asort_strings/asort_by_extension.js"
import asort_by_length_and_position from "./asort_strings/asort_by_length_and_position.js"
import asort_by_length_asc from "./asort_strings/asort_by_length_asc.js"
import asort_by_matches_in_list from "./asort_strings/asort_by_matches_in_list.js"
import asort_by_rating from "./asort_strings/asort_by_rating.js"
import asort_by_rating_and_position from "./asort_strings/asort_by_rating_and_position.js"
import asort_strings_combine_lists from "./asort_strings/asort_strings_combine_lists.js"
import asort_objects_by_property from "./asort_objects/asort_by_property.js"
import asort_objects_by_property_and_position from "./asort_objects/asort_by_property_and_position.js"
import * as arrays from "./arrays.js"
import * as asort_words from "./asort_words.js"
import * as astrings from "./astrings.js"
import * as cli from "./cli.js"
import * as functions from "./functions.js"
import * as numbers from "./numbers.js"
import * as objects from "./objects.js"
import * as promises from "./promises.js"
import * as req from "./req.js"
import * as requests from "./requests.js"
import * as sh from "./sh.js"
import * as strings from "./strings.js"
import * as ui from "./ui.js"
import * as urls from "./urls.js"
import * as words from "./words.js"

let uui = {
  asort_objects: {
    by_property: asort_objects_by_property,
    by_property_and_position: asort_objects_by_property_and_position,
  },
  asort_strings: {
    by_extension: asort_by_extension,
    by_length_and_position: asort_by_length_and_position,
    by_length_asc: asort_by_length_asc,
    by_matches_in_list: asort_by_matches_in_list,
    by_rating: asort_by_rating,
    by_rating_and_position: asort_by_rating_and_position,
    strings_combine_lists: asort_strings_combine_lists,
  },
  arrays,
  asort_words,
  astrings,
  cli,
  functions,
  numbers,
  objects,
  promises,
  req,
  requests,
  sh,
  strings,
  ui,
  urls,
  words
}

if (typeof window === 'object') {
  window.uui = uui
}

export default uui