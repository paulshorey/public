export const average = function (values) {
	let sum = values.reduce((previous, current) => current += previous);
	return sum / values.length;
};

export const mean = function (values) {
	values.sort((a, b) => a - b);
	let lowMiddle = Math.floor((values.length - 1) / 2);
	let highMiddle = Math.ceil((values.length - 1) / 2);
	return (values[lowMiddle] + values[highMiddle]) / 2;
};

export const is_number = function (variable) {
	if (variable === null) {
		return false;
	}
	if (typeof variable === 'string') {
		variable = Number(variable);
	}
	if (isNaN(variable)) {
		return false;
	}
	return true;
};
