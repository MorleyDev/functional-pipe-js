/** Flip a string (e.g abc becomes cba) */
export function flip(value: string): string {
	return value.split("").reverse().join("");
}

/** Get a substring with max length count from startIndex */
export function substr(startIndex: number, count: number): (value: string) => string {
	return value => value.substr(startIndex, count);
}

/** Get the character at a given index */
export function charAt(index: number): (value: string) => string | undefined {
	return value => value.length <= index ? undefined : value.charAt(index);
}

/** Replace all instances in a string that match a given string or regular expression */
export function replace(target: string | RegExp, replaceWith: string): (value: string) => string {
	function escapeRegExp(str: string) {
		return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
	}
	return target instanceof RegExp
		? value => value.replace(target, replaceWith)
		: replace(new RegExp(escapeRegExp(target), "g"), replaceWith);
}
