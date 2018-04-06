/** Yield the original sequence unmodified */
export function* unit<T>(iterable: Iterable<T>): Iterable<T> {
	return yield* iterable;
}

/** Yield the original sequence unmodified, calling the tapper on every item in the sequence */
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

/** Yield a new iterable sequence that applies the mapper to every item in the original */
export function map<T, U>(mapper: (x: T, index: number) => U): (it: Iterable<T>) => Iterable<U> {
	return function* (iterable: Iterable<T>): Iterable<U> {
		let index = 0;
		for (const value of iterable) {
			yield mapper(value, index);
			index = index + 1;
		}
	};
}

/** Yield all items in every iterable returned by the mapper when applied to every item in the source iterable */
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

/** Yield only the items in an iterable sequence that match the predicate */
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

/** Reduce the items in an iterable down to a single instance of initial type, returning the final result result of the reduction */
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

/** Reduce the items in an iterable down to a single instance of initial type, yielding each step of the reduction */
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

/** Reduce the items in an iterable down to a single instance of the same type as the type contained by that Iterable */
export function fold<T>(predicate: (prev: T, next: T, index: number) => T): (it: Iterable<T>) => T {
	return function (iterable: Iterable<T>): T {
		const [head, ...tail] = Array.from(iterable);

		return reduce(predicate, head)(tail);
	};
}

/** Take and yield the first N items in an iterable sequence */
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

/** Take only the last item in an iterable sequence */
export function last<T>(iterable: Iterable<T>): T | undefined {
	let last: T | undefined = undefined;
	for (const item of iterable) {
		last = item;
	}
	return last;
}

/** Take only the first item in an iterable sequence */
export function first<T>(iterable: Iterable<T>): T | undefined {
	for (const item of iterable) {
		return item;
	}
	return undefined;
}

/** Skip the first N items in a iterable sequence, and then yield the remaining items */
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

/** Take and yield items in an iterable until the passed predicate fails, then abort the sequence */
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
/** Take and yield items in an iterable until the passed predicate passes, then abort the sequence */
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

/** Skip items in an iterable until the passed predicate fails, then yioeld all items in the iterable */
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

/** Skip items in an iterable until the passed predicate matches, then yioeld all items in the iterable */
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
/** Yields the passed iterables at the end of the current iterable */
export function concat<T>(...iterables: Iterable<T>[]): (it: Iterable<T>) => Iterable<T> {
	return function* (it) {
		yield* it;
		for (const iterable of iterables) yield* iterable;
	};
}
/** Append an item to the end of an iterable */
export function push<T>(...next: T[]): (it: Iterable<T>) => Iterable<T> {
	return function* (it) {
		yield* it;
		for (const iterable of next) yield iterable;
	};
}

/** Prepend an item to the beginning of an iterable */
export function unshift<T>(...next: T[]): (it: Iterable<T>) => Iterable<T> {
	return function* (it) {
		for (let i = 0; i < next.length; ++i) yield next[next.length - i - 1];
		yield* it;
	};
}

/** True if at least one item in a sequence matches the given predicate */
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

/** True if every item in a sequence matches the given predicate */
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

/** Play unique items from a set */
export function* distinct<T>(it: Iterable<T>): Iterable<T> {
	const resultSet = new Set<T>();
	for (const item of it) {
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

/** Play the given Iterable ordered by a given key or itself */
export function orderBy<T, U = T>(keySelector?: (item: T, index: number) => U, comparison?: (a: U, b: U) => number): ((item: Iterable<T>) => Iterable<T>) {
	const trueKeySelector: (item: any, index: number) => any = keySelector || defaultKeySelector;
	const trueComparison: (a: any, b: any) => number = comparison || defaultComparison;

	return function* (item: Iterable<T>): Iterable<T> {
		const keyedMapper = map((item: T, index: number) => ({ item, key: trueKeySelector(item, index) }));
		const keyed = keyedMapper(item);
		const keyedArray = Array.from(keyed);
		keyedArray.sort((a, b) => trueComparison(a.key, b.key));
		for (const { item } of keyedArray) {
			yield item;
		}
	};
}

/** Play the given Iterable in reverse order */
export function flip<T>(it: Iterable<T>): Iterable<T> {
	return reduce((prev: T[], next: T) => [next].concat(prev), [])(it);
}

/** Play the given Iterable, and then it N more times */
export function repeat<T>(times: number): (it: Iterable<T>) => Iterable<T> {
	return function* (it) {
		const buffer: T[] = [];
		for (const item of it) {
			buffer.push(item);
			yield item;
		}
		for (let i = 0; i < times; ++i) {
			yield* buffer;
		}
	};
}

/** Play the given Iterable, and then play back that Iterable in reverse */
export function* doppler<T>(it: Iterable<T>): Iterable<T> {
	const buffer: T[] = [];
	for (const item of it) {
		buffer.push(item);
		yield item;
	}
	buffer.reverse();
	yield* buffer;
}

/** Play the given Iterable in a random order */
export function shuffle<T>(it: Iterable<T>, rand = () => Math.random()): Iterable<T> {
	return map((x: [T, number]) => x[0])(orderBy((x: [T, number]) => x[1])(map((x: T) => [x, rand()] as [T, number])(it)))
}
