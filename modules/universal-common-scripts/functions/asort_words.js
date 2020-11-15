/** @module common-universal-scripts//functions/asort_words */

/**
 * Sort input array by number of characters in string (or number cast to string)
 * Will sort ASC by default. Pass second parameter to sort by DESC.
 * @param {array} arr - expects array of strings,
 *       but will also accept array of anything,
 *       will cast any child to string `arr[i].toString()`
 * @param {boolean} desc - sort descending?
 *       if false or undefined, will be sorted ascending
 * @returns {array} arr - also modifies original array to returned value!
 */
export const asort_by_length = function (arr, desc = false) {
	let sort_func = help_sort_by_length.bind({desc});
	return arr.sort(sort_func);
};
/**
 * Sort input array NOT JUST by number of characters in string (like asort_by_length),
 * but instead, sort by width of the "word".
 *       Words with many short letters ("i" and "l") will be treated as having fewer characters.
 *       Especially nice glyphs like "ll" or "li" will be preferred.
 *       Words with wide letters or awkward glyphs ("w" or "sch") will be given lower position.
 * @param {array} arr - expects array of strings,
 *       but will also accept array of anything,
 *       will cast any child to string `arr[i].toString()`
 * @param {boolean} desc - sort descending?
 *       if false or undefined, will be sorted ascending
 * @returns {array} arr - also modifies original array to returned value!
 */
export const asort_by_width = function (arr, desc = false) {
	let sort_func = help_sort_by_width.bind({desc});
	return arr.sort(sort_func);
};

/*
 ***************************************************************************************
 * HELPER FUNCTIONS
 ***************************************************************************************
 */

/**
 * Usage: `[].sort(help_sort_by_length)`
 * Note: NOT EXPORTED
 */
function help_sort_by_length(a, b) {
	let desc = this.desc;
	if (desc) {
		return b.toString().length - a.toString().length;
	}
	return a.toString().length - b.toString().length;
}

/**
 * Usage: `[].sort(help_sort_by_width)`
 *      String "width" is like "".length, but accounts for width of each character.
 *      It is not a JavaScript prototype, but is custom made from character map.
 * Note: NOT EXPORTED
 */
function help_sort_by_width(a, b) {
	let desc = this.desc;
	let a_width = str_width(JSON.stringify(a || ''));
	let b_width = str_width(JSON.stringify(b || ''));
	if (desc) {
		return b_width - a_width;
	}
	return a_width - b_width;
}

/**
 * Get pixel width of characters in word
 * param {string|number|array} str
 *      works best with {string}, but will convert an array or number .toString()
 * returns {number} width - like ''.length, but accounts for width of each character
 */
function str_width(str) {
	str = (str || '').toString(); // cast to string
	let width = 0;
	for (let char of str) {
		width += char_width_plus[char.toLowerCase()] || 15; // default to high number if not English character
	}
	return width;
}

/*
 ***************************************************************************************
 * HELPER VARIABLES
 ***************************************************************************************
 */

const glyph_width_plus = {};
const char_width_plus = {
	'0': 7,
	'1': 4,
	'2': 6,
	'3': 7,
	'4': 7,
	'5': 7,
	'6': 7,
	'7': 6,
	'8': 7,
	'9': 7,
	'a': 6,
	'b': 7,
	'c': 6,
	'd': 7,
	'e': 6,
	'f': 2,
	'g': 6,
	'h': 6,
	'i': 3,
	'j': 2,
	'k': 5,
	'l': 3,
	'm': 9,
	'n': 6,
	'o': 6,
	'p': 6,
	'q': 6,
	'r': 3,
	's': 5,
	't': 3,
	'u': 6,
	'v': 5,
	'w': 9,
	'x': 5,
	'y': 5,
	'z': 5,
};
