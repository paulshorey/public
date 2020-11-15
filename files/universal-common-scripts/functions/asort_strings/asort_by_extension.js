/**
 * Used to sort a list of domain names by their domain extension - putting best ones higher in list.
 * @param arr {Array<String>} - list of strings - each string must contain at least one period "."
 *      NOTE: this function modifies the original array, using .sort()!
 * @param endings {array} - list of endings (domain extensions) to sort by. Best = first. Worst = last.
 * @returns {array} - sorted array
 */
export default function asort_by_extension(arr, endings) {
	return arr.sort(asort_by_extension__helper.bind(endings));
};

function asort_by_extension__helper(a, b) {
	let a_score = this.indexOf(a.substr(a.indexOf('.') + 1));
	let b_score = this.indexOf(b.substr(b.indexOf('.') + 1));
	return a_score - b_score;
}
