export function flip(value: string): string {
	return value.split("").reverse().join("");
}

export function substr(startIndex: number, count: number): (value: string) => string {
	return value => value.substr(startIndex, count);
}

export function charAt(index: number): (value: string) => string | undefined {
	return value => value.length <= index ? undefined : value.charAt(index);
}
