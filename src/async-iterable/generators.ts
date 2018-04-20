
export async function* from<T>(it: Iterable<T>): AsyncIterable<T> {
	yield* it;
}

export function defer<T>(func: () => AsyncIterable<T>): AsyncIterable<T> {
	return new (class implements AsyncIterable<T> {
		constructor(private generator: () => AsyncIterable<T>) { }

		[Symbol.asyncIterator](): AsyncIterator<T> {
			return this.generator()[Symbol.asyncIterator]();
		}
	})(func);
}
