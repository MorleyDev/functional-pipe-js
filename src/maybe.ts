export type Maybe<T> = { [Symbol.iterator](): Iterator<T> };

class MaybeImpl<T> implements Iterable<T> {
	constructor(private extract: () => ({ hasValue: false } | { hasValue: true; value: T })) {
	}

	[Symbol.iterator](): Iterator<T> {
		const self = this;
		let returned = false;
		return {
			next(): IteratorResult<T> {
				if (!returned) {
					returned = true;

					const result = self.extract();
					if (result.hasValue) {
						return {
							done: false,
							value: result.value
						}
					}
				}
				return { done: true, value: null as any };
			}
		}
	}
}

export const just = <T>(value: T): Maybe<T> => new MaybeImpl(() => ({ hasValue: true, value }));
export const nothing = (): Maybe<any> => new MaybeImpl(() => ({ hasValue: false }));

export const defer = <T>(defer: () => Maybe<T>): Maybe<T> => {
	return new MaybeImpl<T>(() => {
		for (const result of defer()) {
			return { hasValue: true, value: result };
		}
		return { hasValue: false };
	})
}
