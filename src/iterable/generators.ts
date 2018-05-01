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
export function range(start: number, count: number): Iterable<number> {
	return defer(function* () {
		for (let i = 0; i < count; ++i) {
			yield start + i;
		}
	});
}

/** Yields an infinite sequence of numbers starting at 0 */
export function infinite(): Iterable<number> {
	return defer(function* () {
		for (let i = 0; ; ++i) {
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
			let set = Array.from(range(2, limit - 1));
			let curr = 2;
			const sqrtLimit = Math.sqrt(limit);
			while (curr <= sqrtLimit) {
				set = set.filter(s => s === curr || s % curr !== 0);
				curr = set.find(s => s > curr)!;
			}
			yield* set;
		})
	}
	return defer(function* () {
		const previousPrimes: number[] = [2, 3];
		yield 2;
		yield 3;
		for (let curr = 5; ; ++curr) {
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
