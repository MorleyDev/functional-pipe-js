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
function range(start, count, inc = 1) {
    return defer(function* () {
        for (let i = 0; i < count; ++i) {
            yield start + (i * inc);
        }
    });
}
exports.range = range;
/** Yields an infinite sequence of numbers starting at 0 */
function infinite(startIndex = 0) {
    return defer(function* () {
        for (let i = startIndex;; ++i) {
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
            let set = Array.from(range(3, (limit / 2) - 1, 2));
            let curr = 3;
            const sqrtLimit = Math.sqrt(limit);
            yield 2;
            let lastIndex = 0;
            while (curr <= sqrtLimit) {
                yield curr;
                set = set.splice(0, lastIndex).concat(set.splice(lastIndex + 1).filter(s => s % curr !== 0));
                lastIndex = set.findIndex(s => s > curr);
                if (lastIndex == null) {
                    return;
                }
                curr = set[lastIndex];
            }
            yield curr;
            yield* set.slice(lastIndex + 1);
        });
    }
    return defer(function* () {
        const previousPrimes = [2, 3];
        yield 2;
        yield 3;
        for (let curr = 5;; curr += 2) {
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