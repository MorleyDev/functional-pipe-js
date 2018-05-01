export function flip(value: string): string {
	return Array(value.length)
		.fill(0)
		.map((_, index) => value.charAt(value.length - index - 1))
		.join("");
}
