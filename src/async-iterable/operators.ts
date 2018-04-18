/** Yield the original sequence unmodified */
export async function* unit<T>(iterable: AsyncIterable<T>): AsyncIterable<T> {
	return yield* iterable;
}

/** Yield the original sequence unmodified, calling the tapper on every item in the sequence */
export function tap<T>(tapper: (value: T, index: number) => any | PromiseLike<any>): (it: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (it) {
		let index = 0;
		for await (const value of it) {
			await tapper(value, index);
			yield value;
			index = index + 1;
		}
	};
}

/** Yield a new iterable sequence that applies the mapper to every item in the original */
export function map<T, U>(mapper: (x: T, index: number) => U | PromiseLike<U>): (it: AsyncIterable<T>) => AsyncIterable<U> {
	return async function* (iterable: AsyncIterable<T>): AsyncIterable<U> {
		let index = 0;
		for await (const value of iterable) {
			yield mapper(value, index);
			index = index + 1;
		}
	};
}

/** Yield all items in every iterable returned by the mapper when applied to every item in the source iterable */
export function flatMap<T, U>(mapper: (x: T, index: number) => Iterable<U> | AsyncIterable<U>): (it: AsyncIterable<T>) => AsyncIterable<U> {
	return async function* (iterable: AsyncIterable<T>): AsyncIterable<U> {
		let index = 0;
		for await (const value of iterable) {
			const innerAsyncIterableProm = mapper(value, index);
			for await (const inner of innerAsyncIterableProm) {
				yield inner;
			}
			index = index + 1;
		}
	};
}

/** Yield only the items in an iterable sequence that match the predicate */
export function filter<T>(predicate: (x: T, index: number) => boolean | PromiseLike<boolean>): (it: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (iterable: AsyncIterable<T>): AsyncIterable<T> {
		let index = 0;
		for await (const value of iterable) {
			if (await predicate(value, index)) {
				yield value;
			}
			index = index + 1;
		}
	};
}

/** Reduce the items in an iterable down to a single instance of initial type, returning the final result result of the reduction */
export function reduce<T, U>(predicate: (prev: U, next: T, index: number) => (U | PromiseLike<U>), initial: U): (it: AsyncIterable<T>) => Promise<U> {
	return async function (iterable: AsyncIterable<T>): Promise<U> {
		let index = 0;
		let prevState = initial;
		for await (const value of iterable) {
			prevState = await predicate(prevState, value, index);
			index = index + 1;
		}
		return prevState;
	};
}

/** Reduce the items in an iterable down to a single instance of initial type, yielding each step of the reduction */
export function scan<T, U>(predicate: (prev: U, next: T, index: number) => U | PromiseLike<U>, initial: U): (it: AsyncIterable<T>) => AsyncIterable<U> {
	return async function* (iterable: AsyncIterable<T>): AsyncIterable<U> {
		let index = 0;
		let prevState = initial;
		for await (const value of iterable) {
			prevState = await Promise.resolve( predicate(prevState, value, index) );
			yield prevState;
			index = index + 1;
		}
		return prevState;
	};
}

/** Reduce the items in an iterable down to a single instance of the same type as the type contained by that AsyncIterable */
export function fold<T>(predicate: (prev: T, next: T, index: number) => T | PromiseLike<T>): (it: AsyncIterable<T>) => Promise<T> {
	return async function (iterable: AsyncIterable<T>): Promise<T> {
		let index = 0;
		let prevState: T | undefined;
		for await (const value of iterable) {
			if (index == 0) {
				prevState = value;
			} else {
				prevState = await predicate(prevState!, value, index);
			}
			index = index + 1;
		}
		return prevState!;
	};
}

/** Take and yield the first N items in an iterable sequence */
export function take(count: number): <T>(iterable: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (iterable) {
		let i = 0;
		for await (const item of iterable) {
			if (i >= count) {
				return;
			}
			yield item;
			i = i + 1;
		}
	};
}

/** Take only the last N items in an iterable sequence */
export function takeLast(count: number) {
	return async function* <T>(iterable: AsyncIterable<T>): AsyncIterable<T> {
		const buffer: T[] = [];
		for await (const item of iterable) {
			buffer.push(item);
			if (buffer.length > count) {
				buffer.shift();
			}
		}
		return yield* buffer;
	};
}

/** Take everything but the last N items in an iterable sequence */
export function skipLast(count: number) {
	return async function* <T>(iterable: AsyncIterable<T>): AsyncIterable<T> {
		const buffer: T[] = [];
		for await (const item of iterable) {
			buffer.push(item);
		}
		if (buffer.length < count) {
			return;
		}
		yield* buffer.slice(0, buffer.length - count);
	};
}

/** Take only the last item in an iterable sequence */
export async function last<T>(iterable: AsyncIterable<T>): Promise<T | undefined> {
	let last: T | undefined = undefined;
	for await (const item of iterable) {
		last = item;
	}
	return last;
}

/** Take only the first item in an iterable sequence */
export async function first<T>(iterable: AsyncIterable<T>): Promise<T | undefined> {
	for await (const item of iterable) {
		return item;
	}
	return undefined;
}

/** Skip the first N items in a iterable sequence, and then yield the remaining items */
export function skip(count: number): <T>(iterable: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (iterable) {
		let i = 0;
		for await (const item of iterable) {
			if (i >= count) {
				yield item;
			}
			i = i + 1;
		}
	};
}

/** Take and yield items in an iterable until the passed predicate fails, then abort the sequence */
export function takeWhile<T>(predicate: (item: T, index: number) => boolean | PromiseLike<boolean>): (iterable: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (iterable) {
		let i = 0;
		for await (const item of iterable) {
			if (!await Promise.resolve(predicate(item, i))) {
				break;
			}
			yield item;
			i = i + 1;
		}
	};
}
/** Take and yield items in an iterable until the passed predicate passes, then abort the sequence */
export function takeUntil<T>(predicate: (item: T, index: number) => boolean | PromiseLike<boolean>): (iterable: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (iterable) {
		let i = 0;
		for await (const item of iterable) {
			if (await predicate(item, i)) {
				return;
			}
			yield item;
			i = i + 1;
		}
	};
}

/** Skip items in an iterable until the passed predicate fails, then yield all items in the iterable */
export function skipWhile<T>(predicate: (item: T, index: number) => boolean | PromiseLike<boolean>): (iterable: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (iterable) {
		let i = 0;
		let canReturn = false;
		for await (const item of iterable) {
			if (!canReturn) {
				canReturn = !(await Promise.resolve(predicate(item, i)));
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

/** Skip items in an iterable until the passed predicate matches, then yield all items in the iterable */
export function skipUntil<T>(predicate: (item: T, index: number) => boolean | PromiseLike<boolean>): (iterable: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (iterable) {
		let i = 0;
		let canReturn = false;
		for await (const item of iterable) {
			if (!canReturn) {
				canReturn = await predicate(item, i);
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

/** Enumerate until index and return the element at index, or consumes and return undefined */
export function elementAtOrDefault<U>(index: number, or: U): <T>(it: AsyncIterable<T>) => Promise<T | U> {
	return async function (it) {
		let i = 0;
		for await (const item of it) {
			if (i === index) {
				return item;
			}
			i = i + 1;
		}
		return or;
	}
}

/** Yields the passed iterables at the end of the current iterable */
export function concat<T>(...iterables: AsyncIterable<T>[]): (it: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (it) {
		yield* it;
		for await (const iterable of iterables) yield* iterable;
	};
}
/** Append an item to the end of an iterable */
export function push<T>(...next: T[]): (it: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (it) {
		yield* it;
		for await (const iterable of next) yield iterable;
	};
}

/** Prepend an item to the beginning of an iterable */
export function unshift<T>(...next: T[]): (it: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (it) {
		for (let i = 0; i < next.length; ++i) yield next[next.length - i - 1];
		yield* it;
	};
}

/** True if at least one item in a sequence matches the given predicate */
export function some<T>(predicate: (item: T, index: number) => boolean | PromiseLike<boolean>): (it: AsyncIterable<T>) => Promise<boolean> {
	return async it => {
		let i = 0;
		for await (const item of it) {
			if (await predicate(item, i)) {
				return true;
			}
			i = i + 1;
		}
		return false;
	};
}

/** True if every item in a sequence matches the given predicate */
export function every<T>(predicate: (item: T, index: number) => boolean | PromiseLike<boolean>): (it: AsyncIterable<T>) => Promise<boolean> {
	return async it => {
		let i = 0;
		for await (const item of it) {
			if (!await Promise.resolve(predicate(item, i))) {
				return false;
			}
			i = i + 1;
		}
		return true;
	};
}

/** Play unique items from a set */
export async function* distinct<T>(it: AsyncIterable<T>): AsyncIterable<T> {
	const resultSet = new Set<T>();
	for await (const item of it) {
		if (!resultSet.has(item)) {
			resultSet.add(item);
			yield item;
		}
	}
}

const defaultKeySelector = (item: any, index: number) => item;
const defaultComparison = (a: any, b: any) => {
	if (a < b) {
		return -1;
	} else if (a > b) {
		return 1;
	} else {
		return 0;
	}
};

/** Play the given AsyncIterable ordered by a given key or itself */
export function orderBy<T, U = T>(keySelector?: (item: T, index: number) => U, comparison?: (a: U, b: U) => number): ((item: AsyncIterable<T>) => AsyncIterable<T>) {
	const trueKeySelector: (item: any, index: number) => any = keySelector || defaultKeySelector;
	const trueComparison: (a: any, b: any) => number = comparison || defaultComparison;

	return async function* (item: AsyncIterable<T>): AsyncIterable<T> {
		const keyedMapper = map((item: T, index: number) => ({ item, key: trueKeySelector(item, index) }));
		const keyed = keyedMapper(item);
		const keyedArray = await toWriteableArray(keyed);
		keyedArray.sort((a, b) => trueComparison(a.key, b.key));
		for await (const { item } of keyedArray) {
			yield item;
		}
	};
}

/** Play the given AsyncIterable in reverse order */
export async function* flip<T>(it: AsyncIterable<T>): AsyncIterable<T> {
	yield* await reduce((prev: T[], next: T) => [next].concat(prev), [] as T[])(it);
}

/** Play the given AsyncIterable, and then it N more times */
export function repeat<T>(times: number): (it: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (it) {
		const buffer: T[] = [];
		for await (const item of it) {
			buffer.push(item);
			yield item;
		}
		for (let i = 0; i < times; ++i) {
			yield* buffer;
		}
	};
}

/** Play the given AsyncIterable, and then play back that AsyncIterable in reverse */
export async function* doppler<T>(it: AsyncIterable<T>): AsyncIterable<T> {
	const buffer: T[] = [];
	for await (const item of it) {
		buffer.push(item);
		yield item;
	}
	buffer.reverse();
	yield* buffer;
}

/** Play the given AsyncIterable in a random order */
export function shuffle<T>(it: AsyncIterable<T>, rand = () => Math.random()): AsyncIterable<T> {
	return map((x: [T, number]) => x[0])(orderBy((x: [T, number]) => x[1])(map((x: T) => [x, rand()] as [T, number])(it)))
}

/** Return the specified iterable if the source iterable is empty */
export function or<T>(other: AsyncIterable<T>): (source: AsyncIterable<T>) => AsyncIterable<T> {
	return async function* (source) {
		let hasYieldedItem = false;
		for await (const item of source) {
			yield item;
			hasYieldedItem = true;
		}
		if (!hasYieldedItem) {
			yield* other;
		}
	};
}

/** Evaluate the entire iterable to a readonly array. Provided as type deduction seems to fail when using Array.from to accomplish this outside of a lamda */
export async function toArray<T>(iterable: AsyncIterable<T>): Promise<ReadonlyArray<T>> {
	const blob: T[] = [];
	for await (const it of iterable) {
		blob.push(it);
	}
	return blob;
}

/** Evaluate the entire iterable to a readonly array. Provided as type deduction seems to fail when using Array.from to accomplish this outside of a lamda */
export async function toWriteableArray<T>(iterable: AsyncIterable<T>): Promise<T[]> {
	const blob: T[] = [];
	for await (const it of iterable) {
		blob.push(it);
	}
	return blob;
}

/** Replaces the value of an item at the specified index, returning the new iterable set */
export function updateAt<T>(index: number, value: T): (source: AsyncIterable<T>) => AsyncIterable<T> {
	return async function*(source) {
		let i = 0;
		for await (const item of source) {
			if (i === index) {
				yield value;
			} else {
				yield item;
			}
			i = i + 1;
		}
	}
}

/** Returns a new iterable set that does not have the element at index */
export function removeAt<T>(index: number): (source: AsyncIterable<T>) => AsyncIterable<T> {
	return async function*(source) {
		let i = 0;
		for await (const item of source) {
			if (i !== index) {
				yield item;
			}
			i = i + 1;
		}
	}
}
