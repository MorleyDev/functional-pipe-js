/** Wraps an iterable factory inside a class that allows it to be repeatedly iterated without state, same as how Arrays work */
export function defer<T>(func: () => Iterable<T>): Iterable<T> {
	return new (class implements Iterable<T> {
		constructor(private generator: () => Iterable<T>) { }

		[Symbol.iterator](): Iterator<T> {
			return this.generator()[Symbol.iterator]();
		}
	})(func);
}

/** Yields count numbers from start onwards
 * e.g range(10, 3) will yield [10, 11, 12] */
export function range(start: number, count: number, inc: number = 1): Iterable<number> {
	return defer(function* () {
		for (let i = 0; i < count; ++i) {
			yield start + (i * inc);
		}
	});
}

/** Yields an infinite sequence of numbers starting at 0 */
export function infinite(startIndex: number = 0): Iterable<number> {
	return defer(function* () {
		for (let i = startIndex; ; ++i) {
			yield i;
		}
	});
}


/** Yields the infinite fibonacci sequence (1, 1, 2, 3, 5, 8, 13, etc...) */
export function fibonacci(): Iterable<number> {
	return defer(function* () {
		let prev = 1;
		let curr = 1;
		yield prev;
		yield curr;
		for (; ;) {
			let temp = prev;
			prev = curr;
			curr = temp + curr;
			yield curr;
		}
	});
}

/** Generate a sequence of primes. Limit that sequence to primes below the specified amount if provided, otherwise generate an infinite sequence of primes
 * (Will become progressively more performance intensive for each prime)
 */
export function primes(limit?: number): Iterable<number> {
	if (limit != null) {
		// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
		return defer(function* () {

			let set = Array.from(range(3, (limit / 2) - 1, 2));
			let curr = 3;
			const sqrtLimit = Math.sqrt(limit);
			yield 2;
			let lastIndex = 0;
			while (curr <= sqrtLimit) {
				yield curr;
				set = set.splice(0, lastIndex).concat(set.splice(lastIndex + 1).filter(s => s % curr !== 0));
				lastIndex = set.findIndex(s => s > curr)!;
				if (lastIndex == null) {
					return;
				}
				curr = set[lastIndex];
			}
			yield curr;
			yield* set.slice(lastIndex + 1);
		})
	}
	return defer(function* () {
		const previousPrimes: number[] = [2, 3];
		yield 2;
		yield 3;
		for (let curr = 5; ; curr += 2) {
			let allowed = true;
			const sqrt = Math.sqrt(curr);
			for (const prime of previousPrimes) {
				if (prime > sqrt) {
					break;
				} else if (curr % prime === 0) {
					allowed = false;
					break;
				}
			}
			if (allowed) {
				previousPrimes.push(curr);
				yield curr;
			}
		}
	});
}

export function* empty(): Iterable<any> { }

export function concat<T>(...iterables: Iterable<T>[]): Iterable<T> {
	return defer(function* () {
		for (const iterable of iterables) {
			yield* iterable;
		}
	});
}

export function keys<T>(item: T): Iterable<string> {
	return defer(function* () {
		for (const key in item) {
			yield key;
		}
	});
}


export function values<T>(item: T): Iterable<T[keyof T]> {
	return defer(function* () {
		for (const key in item) {
			yield item[key];
		}
	});
}

export function zip<T1>(): Iterable<never>;
export function zip<T1>(iterable1: Iterable<T1>): Iterable<[T1]>;
export function zip<T1, T2>(iterables: Iterable<T1>, iterable2: Iterable<T2>): Iterable<[T1, T2]>;
export function zip<T1, T2, T3>(iterables: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>): Iterable<[T1, T2, T3]>;
export function zip<T1, T2, T3, T4>(iterables: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>): Iterable<[T1, T2, T3, T4]>;
export function zip<T>(...iterables: Iterable<T>[]): Iterable<ReadonlyArray<T>> {
	if (iterables.length == 0) {
		return empty();
	}
	return defer(function* () {
		const iterators = iterables.map(it => it[Symbol.iterator]());
		function tick() {
			const tick = iterators.map(it => it.next());
			if (tick.some(t => t.done)) {
				return undefined;
			} else {
				return tick.map(t => t.value);
			}
		}
		for (let result = tick(); result != null; result = tick()) {
			yield result;
		}
	});
}
