export function join(separator: string = ""): (it: Iterable<string>) => string {
	return (it) => Array.from(it).join(separator);
}

export function concat(...strings: string[]): string {
	return strings.join("");
}
