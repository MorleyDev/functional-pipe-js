export function flip(value: string): string {
	return value.split("").reverse().join("");
}

export function substr(startIndex: number, count: number): (value: string) => string {
	return value => value.substr(startIndex, count);
}
