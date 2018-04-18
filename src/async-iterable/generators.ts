export async function* from<T>(it: Iterable<T>): AsyncIterable<T> {
	yield* it;
}

