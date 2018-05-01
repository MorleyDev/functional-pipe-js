export function join(separator: string = ""): (it: Iterable<string>) => string {
	return (it) => Array.from(it).join(separator);
}
