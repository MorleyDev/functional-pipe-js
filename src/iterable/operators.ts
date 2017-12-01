export function* unit<T>(iterable: Iterable<T>): Iterable<T> {
	return yield* iterable;
}

export function tap<T>(tapper: (value: T, index: number) => void): (it: Iterable<T>) => Iterable<T> {
	return function* (it) {
		let index = 0;
		for (const value of it) {
			tapper(value, index);
			yield value;
			index = index + 1;
		}
	};
}

export function map<T, U>(mapper: (x: T, index: number) => U): (it: Iterable<T>) => Iterable<U> {
	return function* (iterable: Iterable<T>): Iterable<U> {
		let index = 0;
		for (const value of iterable) {
			yield mapper(value, index);
			index = index + 1;
		}
	};
}

export function flatMap<T, U>(mapper: (x: T, index: number) => Iterable<U>): (it: Iterable<T>) => Iterable<U> {
	return function* (iterable: Iterable<T>): Iterable<U> {
		let index = 0;
		for (const value of iterable) {
			const innerIterable = mapper(value, index);
			for (const inner of innerIterable) {
				yield inner;
			}
			index = index + 1;
		}
	};
}

export function filter<T>(predicate: (x: T, index: number) => boolean): (it: Iterable<T>) => Iterable<T> {
	return function* (iterable: Iterable<T>): Iterable<T> {
		let index = 0;
		for (const value of iterable) {
			if (predicate(value, index)) {
				yield value;
			}
			index = index + 1;
		}
	};
}

export function reduce<T, U>(predicate: (prev: U, next: T, index: number) => U, initial: U): (it: Iterable<T>) => U {
	return function (iterable: Iterable<T>): U {
		let index = 0;
		let prevState = initial;
		for (const value of iterable) {
			prevState = predicate(prevState, value, index);
			index = index + 1;
		}
		return prevState;
	};
}

export function scan<T, U>(predicate: (prev: U, next: T, index: number) => U, initial: U): (it: Iterable<T>) => Iterable<U> {
	return function* (iterable: Iterable<T>): Iterable<U> {
		let index = 0;
		let prevState = initial;
		for (const value of iterable) {
			prevState = predicate(prevState, value, index);
			yield prevState;
			index = index + 1;
		}
		return prevState;
	};
}

export function fold<T>(predicate: (prev: T, next: T, index: number) => T): (it: Iterable<T>) => T {
	return function (iterable: Iterable<T>): T {
		const [head, ...tail] = Array.from(iterable);

		return reduce(predicate, head)(tail);
	};
}

export function take(count: number): <T>(iterable: Iterable<T>) => Iterable<T> {
	return function* (iterable) {
		let i = 0;
		for (const item of iterable) {
			if (i >= count) {
				return;
			}
			yield item;
			i = i + 1;
		}
	};
}

export function last<T>(iterable: Iterable<T>): T | undefined {
	let last: T | undefined = undefined;
	for (const item of iterable) {
		last = item;
	}
	return last;
}

export function first<T>(iterable: Iterable<T>): T | undefined {
	for (const item of iterable) {
		return item;
	}
	return undefined;
}

export function skip(count: number): <T>(iterable: Iterable<T>) => Iterable<T> {
	return function* (iterable) {
		let i = 0;
		for (const item of iterable) {
			if (i >= count) {
				yield item;
			}
			i = i + 1;
		}
	};
}

export function takeWhile<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T> {
	return function* (iterable) {
		let i = 0;
		for (const item of iterable) {
			if (!predicate(item, i)) {
				break;
			}
			yield item;
			i = i + 1;
		}
	};
}

export function takeUntil<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T> {
	return function* (iterable) {
		let i = 0;
		for (const item of iterable) {
			if (predicate(item, i)) {
				return;
			}
			yield item;
			i = i + 1;
		}
	};
}

export function skipWhile<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T> {
	return function* (iterable) {
		let i = 0;
		let canReturn = false;
		for (const item of iterable) {
			if (!canReturn) {
				canReturn = !predicate(item, i);
				if (canReturn) {
					yield item;
				}
				i = i + 1;
			} else {
				yield item;
			}
		}
	};
}

export function skipUntil<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T> {
	return function* (iterable) {
		let i = 0;
		let canReturn = false;
		for (const item of iterable) {
			if (!canReturn) {
				canReturn = predicate(item, i);
				if (canReturn) {
					yield item;
				}
				i = i + 1;
			} else {
				yield item;
			}
		}
	};
}

export function concat<T>(...iterables: Iterable<T>[]): (it: Iterable<T>) => Iterable<T> {
	return function* (it) {
		yield* it;
		for (const iterable of iterables) yield* iterable;
	};
}

export function push<T>(...next: T[]): (it: Iterable<T>) => Iterable<T> {
	return function* (it) {
		yield* it;
		for (const iterable of next) yield iterable;
	};
}

export function unshift<T>(...next: T[]): (it: Iterable<T>) => Iterable<T> {
	return function* (it) {
		for (let i = 0; i < next.length; ++i) yield next[next.length - i - 1];
		yield* it;
	};
}

export function some<T>(predicate: (item: T, index: number) => boolean): (it: Iterable<T>) => boolean {
	return it => {
		let i = 0;
		for (const item of it) {
			if (predicate(item, i)) {
				return true;
			}
			i = i + 1;
		}
		return false;
	};
}

export function every<T>(predicate: (item: T, index: number) => boolean): (it: Iterable<T>) => boolean {
	return it => {
		let i = 0;
		for (const item of it) {
			if (!predicate(item, i)) {
				return false;
			}
			i = i + 1;
		}
		return true;
	};
}
