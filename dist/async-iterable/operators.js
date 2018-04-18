"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Yield the original sequence unmodified */
async function* unit(iterable) {
    return yield* iterable;
}
exports.unit = unit;
/** Yield the original sequence unmodified, calling the tapper on every item in the sequence */
function tap(tapper) {
    return async function* (it) {
        let index = 0;
        for await (const value of it) {
            await tapper(value, index);
            yield value;
            index = index + 1;
        }
    };
}
exports.tap = tap;
/** Yield a new iterable sequence that applies the mapper to every item in the original */
function map(mapper) {
    return async function* (iterable) {
        let index = 0;
        for await (const value of iterable) {
            yield mapper(value, index);
            index = index + 1;
        }
    };
}
exports.map = map;
/** Yield all items in every iterable returned by the mapper when applied to every item in the source iterable */
function flatMap(mapper) {
    return async function* (iterable) {
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
exports.flatMap = flatMap;
/** Yield only the items in an iterable sequence that match the predicate */
function filter(predicate) {
    return async function* (iterable) {
        let index = 0;
        for await (const value of iterable) {
            if (await predicate(value, index)) {
                yield value;
            }
            index = index + 1;
        }
    };
}
exports.filter = filter;
/** Reduce the items in an iterable down to a single instance of initial type, returning the final result result of the reduction */
function reduce(predicate, initial) {
    return async function (iterable) {
        let index = 0;
        let prevState = initial;
        for await (const value of iterable) {
            prevState = await predicate(prevState, value, index);
            index = index + 1;
        }
        return prevState;
    };
}
exports.reduce = reduce;
/** Reduce the items in an iterable down to a single instance of initial type, yielding each step of the reduction */
function scan(predicate, initial) {
    return async function* (iterable) {
        let index = 0;
        let prevState = initial;
        for await (const value of iterable) {
            prevState = await Promise.resolve(predicate(prevState, value, index));
            yield prevState;
            index = index + 1;
        }
        return prevState;
    };
}
exports.scan = scan;
/** Reduce the items in an iterable down to a single instance of the same type as the type contained by that AsyncIterable */
function fold(predicate) {
    return async function (iterable) {
        let index = 0;
        let prevState;
        for await (const value of iterable) {
            if (index == 0) {
                prevState = value;
            }
            else {
                prevState = await predicate(prevState, value, index);
            }
            index = index + 1;
        }
        return prevState;
    };
}
exports.fold = fold;
/** Take and yield the first N items in an iterable sequence */
function take(count) {
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
exports.take = take;
/** Take only the last N items in an iterable sequence */
function takeLast(count) {
    return async function* (iterable) {
        const buffer = [];
        for await (const item of iterable) {
            buffer.push(item);
            if (buffer.length > count) {
                buffer.shift();
            }
        }
        return yield* buffer;
    };
}
exports.takeLast = takeLast;
/** Take everything but the last N items in an iterable sequence */
function skipLast(count) {
    return async function* (iterable) {
        const buffer = [];
        for await (const item of iterable) {
            buffer.push(item);
        }
        if (buffer.length < count) {
            return;
        }
        yield* buffer.slice(0, buffer.length - count);
    };
}
exports.skipLast = skipLast;
/** Take only the last item in an iterable sequence */
async function last(iterable) {
    let last = undefined;
    for await (const item of iterable) {
        last = item;
    }
    return last;
}
exports.last = last;
/** Take only the first item in an iterable sequence */
async function first(iterable) {
    for await (const item of iterable) {
        return item;
    }
    return undefined;
}
exports.first = first;
/** Skip the first N items in a iterable sequence, and then yield the remaining items */
function skip(count) {
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
exports.skip = skip;
/** Take and yield items in an iterable until the passed predicate fails, then abort the sequence */
function takeWhile(predicate) {
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
exports.takeWhile = takeWhile;
/** Take and yield items in an iterable until the passed predicate passes, then abort the sequence */
function takeUntil(predicate) {
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
exports.takeUntil = takeUntil;
/** Skip items in an iterable until the passed predicate fails, then yield all items in the iterable */
function skipWhile(predicate) {
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
            }
            else {
                yield item;
            }
        }
    };
}
exports.skipWhile = skipWhile;
/** Skip items in an iterable until the passed predicate matches, then yield all items in the iterable */
function skipUntil(predicate) {
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
            }
            else {
                yield item;
            }
        }
    };
}
exports.skipUntil = skipUntil;
/** Enumerate until index and return the element at index, or consumes and return undefined */
function elementAtOrDefault(index, or) {
    return async function (it) {
        let i = 0;
        for await (const item of it) {
            if (i === index) {
                return item;
            }
            i = i + 1;
        }
        return or;
    };
}
exports.elementAtOrDefault = elementAtOrDefault;
/** Yields the passed iterables at the end of the current iterable */
function concat(...iterables) {
    return async function* (it) {
        yield* it;
        for await (const iterable of iterables)
            yield* iterable;
    };
}
exports.concat = concat;
/** Append an item to the end of an iterable */
function push(...next) {
    return async function* (it) {
        yield* it;
        for await (const iterable of next)
            yield iterable;
    };
}
exports.push = push;
/** Prepend an item to the beginning of an iterable */
function unshift(...next) {
    return async function* (it) {
        for (let i = 0; i < next.length; ++i)
            yield next[next.length - i - 1];
        yield* it;
    };
}
exports.unshift = unshift;
/** True if at least one item in a sequence matches the given predicate */
function some(predicate) {
    return async (it) => {
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
exports.some = some;
/** True if every item in a sequence matches the given predicate */
function every(predicate) {
    return async (it) => {
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
exports.every = every;
/** Play unique items from a set */
async function* distinct(it) {
    const resultSet = new Set();
    for await (const item of it) {
        if (!resultSet.has(item)) {
            resultSet.add(item);
            yield item;
        }
    }
}
exports.distinct = distinct;
const defaultKeySelector = (item, index) => item;
const defaultComparison = (a, b) => {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    else {
        return 0;
    }
};
/** Play the given AsyncIterable ordered by a given key or itself */
function orderBy(keySelector, comparison) {
    const trueKeySelector = keySelector || defaultKeySelector;
    const trueComparison = comparison || defaultComparison;
    return async function* (item) {
        const keyedMapper = map((item, index) => ({ item, key: trueKeySelector(item, index) }));
        const keyed = keyedMapper(item);
        const keyedArray = await toWriteableArray(keyed);
        keyedArray.sort((a, b) => trueComparison(a.key, b.key));
        for await (const { item } of keyedArray) {
            yield item;
        }
    };
}
exports.orderBy = orderBy;
/** Play the given AsyncIterable in reverse order */
async function* flip(it) {
    yield* await reduce((prev, next) => [next].concat(prev), [])(it);
}
exports.flip = flip;
/** Play the given AsyncIterable, and then it N more times */
function repeat(times) {
    return async function* (it) {
        const buffer = [];
        for await (const item of it) {
            buffer.push(item);
            yield item;
        }
        for (let i = 0; i < times; ++i) {
            yield* buffer;
        }
    };
}
exports.repeat = repeat;
/** Play the given AsyncIterable, and then play back that AsyncIterable in reverse */
async function* doppler(it) {
    const buffer = [];
    for await (const item of it) {
        buffer.push(item);
        yield item;
    }
    buffer.reverse();
    yield* buffer;
}
exports.doppler = doppler;
/** Play the given AsyncIterable in a random order */
function shuffle(it, rand = () => Math.random()) {
    return map((x) => x[0])(orderBy((x) => x[1])(map((x) => [x, rand()])(it)));
}
exports.shuffle = shuffle;
/** Return the specified iterable if the source iterable is empty */
function or(other) {
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
exports.or = or;
/** Evaluate the entire iterable to a readonly array. Provided as type deduction seems to fail when using Array.from to accomplish this outside of a lamda */
async function toArray(iterable) {
    const blob = [];
    for await (const it of iterable) {
        blob.push(it);
    }
    return blob;
}
exports.toArray = toArray;
/** Evaluate the entire iterable to a readonly array. Provided as type deduction seems to fail when using Array.from to accomplish this outside of a lamda */
async function toWriteableArray(iterable) {
    const blob = [];
    for await (const it of iterable) {
        blob.push(it);
    }
    return blob;
}
exports.toWriteableArray = toWriteableArray;
/** Replaces the value of an item at the specified index, returning the new iterable set */
function updateAt(index, value) {
    return async function* (source) {
        let i = 0;
        for await (const item of source) {
            if (i === index) {
                yield value;
            }
            else {
                yield item;
            }
            i = i + 1;
        }
    };
}
exports.updateAt = updateAt;
/** Returns a new iterable set that does not have the element at index */
function removeAt(index) {
    return async function* (source) {
        let i = 0;
        for await (const item of source) {
            if (i !== index) {
                yield item;
            }
            i = i + 1;
        }
    };
}
exports.removeAt = removeAt;
//# sourceMappingURL=operators.js.map