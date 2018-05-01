"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Wraps an iterable factory inside a class that allows it to be repeatedly iterated without state, same as how Arrays work */
function defer(func) {
    return new (class {
        constructor(generator) {
            this.generator = generator;
        }
        [Symbol.iterator]() {
            return this.generator()[Symbol.iterator]();
        }
    })(func);
}
exports.defer = defer;
/** Yields count numbers from start onwards
 * e.g range(10, 3) will yield [10, 11, 12] */
function range(start, count) {
    return defer(function* () {
        for (let i = 0; i < count; ++i) {
            yield start + i;
        }
    });
}
exports.range = range;
/** Yields an infinite sequence of numbers starting at 0 */
function infinite() {
    return defer(function* () {
        for (let i = 0;; ++i) {
            yield i;
        }
    });
}
exports.infinite = infinite;
/** Yields the infinite fibonacci sequence (1, 1, 2, 3, 5, 8, 13, etc...) */
function fibonacci() {
    return defer(function* () {
        let prev = 1;
        let curr = 1;
        yield prev;
        yield curr;
        for (;;) {
            let temp = prev;
            prev = curr;
            curr = temp + curr;
            yield curr;
        }
    });
}
exports.fibonacci = fibonacci;
/** Generate a sequence of primes. Limit that sequence to primes below the specified amount if provided, otherwise generate an infinite sequence of primes
 * (Will become progressively more performance intensive for each prime)
 */
function primes(limit) {
    if (limit != null) {
        // https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
        return defer(function* () {
            let set = Array.from(range(2, limit - 1));
            let curr = 2;
            const sqrtLimit = Math.sqrt(limit);
            while (curr <= sqrtLimit) {
                set = set.filter(s => s === curr || s % curr !== 0);
                curr = set.find(s => s > curr);
            }
            yield* set;
        });
    }
    return defer(function* () {
        const previousPrimes = [2, 3];
        yield 2;
        yield 3;
        for (let curr = 5;; ++curr) {
            let allowed = true;
            const sqrt = Math.sqrt(curr);
            for (const prime of previousPrimes) {
                if (prime > sqrt) {
                    break;
                }
                else if (curr % prime === 0) {
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
exports.primes = primes;
function* empty() { }
exports.empty = empty;
function concat(...iterables) {
    return defer(function* () {
        for (const iterable of iterables) {
            yield* iterable;
        }
    });
}
exports.concat = concat;
function keys(item) {
    return defer(function* () {
        for (const key in item) {
            yield key;
        }
    });
}
exports.keys = keys;
function values(item) {
    return defer(function* () {
        for (const key in item) {
            yield item[key];
        }
    });
}
exports.values = values;
function zip(...iterables) {
    if (iterables.length == 0) {
        return empty();
    }
    return defer(function* () {
        const iterators = iterables.map(it => it[Symbol.iterator]());
        function tick() {
            const tick = iterators.map(it => it.next());
            if (tick.some(t => t.done)) {
                return undefined;
            }
            else {
                return tick.map(t => t.value);
            }
        }
        for (let result = tick(); result != null; result = tick()) {
            yield result;
        }
    });
}
exports.zip = zip;
//# sourceMappingURL=generators.js.map