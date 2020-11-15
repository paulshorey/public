/**
 * Sort strings by relevance (matching words in list)
 * Strings will be promoted if they match most words in list, and have fewest remaining characters.
 * @param arr {Array<String>} - list of strings
 *      (this function modifies the original array, using .sort())
 * @param matchList {array} - list of words -
 * @returns {array} - sorted array
 */
export default function asort_by_matches_in_list(arr, matchList) {
	let ratings = {};
	for (let str of arr) {
		let string = str.replace(/[^a-z0-9]/gi, '');
		let count = 0;
		for (let word of matchList) {
			if (string.includes(word)) {
				count++;
				string = string.replace(word, '');
			}
		}
		ratings[str] = count;
	}
	return arr.sort(asort_by_matches_in_list__helper.bind(ratings));
};

function asort_by_matches_in_list__helper(a, b) {
	let a_score = this[a] || 0;
	let b_score = this[b] || 0;
	return b_score - a_score;
}