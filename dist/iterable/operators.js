"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Yield the original sequence unmodified */
function* unit(iterable) {
    return yield* iterable;
}
exports.unit = unit;
/** Yield the original sequence unmodified, calling the tapper on every item in the sequence */
function tap(tapper) {
    return function* (it) {
        let index = 0;
        for (const value of it) {
            tapper(value, index);
            yield value;
            index = index + 1;
        }
    };
}
exports.tap = tap;
/** Yield a new iterable sequence that applies the mapper to every item in the original */
function map(mapper) {
    return function* (iterable) {
        let index = 0;
        for (const value of iterable) {
            yield mapper(value, index);
            index = index + 1;
        }
    };
}
exports.map = map;
/** Yield all items in every iterable returned by the mapper when applied to every item in the source iterable */
function flatMap(mapper) {
    return function* (iterable) {
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
exports.flatMap = flatMap;
/** Yield only the items in an iterable sequence that match the predicate */
function filter(predicate) {
    return function* (iterable) {
        let index = 0;
        for (const value of iterable) {
            if (predicate(value, index)) {
                yield value;
            }
            index = index + 1;
        }
    };
}
exports.filter = filter;
/** Reduce the items in an iterable down to a single instance of initial type, returning the final result result of the reduction */
function reduce(predicate, initial) {
    return function (iterable) {
        let index = 0;
        let prevState = initial;
        for (const value of iterable) {
            prevState = predicate(prevState, value, index);
            index = index + 1;
        }
        return prevState;
    };
}
exports.reduce = reduce;
/** Reduce the items in an iterable down to a single instance of initial type, yielding each step of the reduction */
function scan(predicate, initial) {
    return function* (iterable) {
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
exports.scan = scan;
/** Reduce the items in an iterable down to a single instance of the same type as the type contained by that Iterable */
function fold(predicate) {
    return function (iterable) {
        const [head, ...tail] = Array.from(iterable);
        return reduce(predicate, head)(tail);
    };
}
exports.fold = fold;
/** Take and yield the first N items in an iterable sequence */
function take(count) {
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
exports.take = take;
/** Take only the last N items in an iterable sequence */
function takeLast(count) {
    return function* (iterable) {
        const buffer = [];
        for (const item of iterable) {
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
    return function* (iterable) {
        const buffer = [];
        for (const item of iterable) {
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
function last(iterable) {
    let last = undefined;
    for (const item of iterable) {
        last = item;
    }
    return last;
}
exports.last = last;
/** Take only the first item in an iterable sequence */
function first(iterable) {
    for (const item of iterable) {
        return item;
    }
    return undefined;
}
exports.first = first;
/** Skip the first N items in a iterable sequence, and then yield the remaining items */
function skip(count) {
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
exports.skip = skip;
/** Take and yield items in an iterable until the passed predicate fails, then abort the sequence */
function takeWhile(predicate) {
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
exports.takeWhile = takeWhile;
/** Take and yield items in an iterable until the passed predicate passes, then abort the sequence */
function takeUntil(predicate) {
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
exports.takeUntil = takeUntil;
/** Skip items in an iterable until the passed predicate fails, then yioeld all items in the iterable */
function skipWhile(predicate) {
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
            }
            else {
                yield item;
            }
        }
    };
}
exports.skipWhile = skipWhile;
/** Skip items in an iterable until the passed predicate matches, then yioeld all items in the iterable */
function skipUntil(predicate) {
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
            }
            else {
                yield item;
            }
        }
    };
}
exports.skipUntil = skipUntil;
/** Yields the passed iterables at the end of the current iterable */
function concat(...iterables) {
    return function* (it) {
        yield* it;
        for (const iterable of iterables)
            yield* iterable;
    };
}
exports.concat = concat;
/** Append an item to the end of an iterable */
function push(...next) {
    return function* (it) {
        yield* it;
        for (const iterable of next)
            yield iterable;
    };
}
exports.push = push;
/** Prepend an item to the beginning of an iterable */
function unshift(...next) {
    return function* (it) {
        for (let i = 0; i < next.length; ++i)
            yield next[next.length - i - 1];
        yield* it;
    };
}
exports.unshift = unshift;
/** True if at least one item in a sequence matches the given predicate */
function some(predicate) {
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
exports.some = some;
/** True if every item in a sequence matches the given predicate */
function every(predicate) {
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
exports.every = every;
/** Play unique items from a set */
function* distinct(it) {
    const resultSet = new Set();
    for (const item of it) {
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
/** Play the given Iterable ordered by a given key or itself */
function orderBy(keySelector, comparison) {
    const trueKeySelector = keySelector || defaultKeySelector;
    const trueComparison = comparison || defaultComparison;
    return function* (item) {
        const keyedMapper = map((item, index) => ({ item, key: trueKeySelector(item, index) }));
        const keyed = keyedMapper(item);
        const keyedArray = Array.from(keyed);
        keyedArray.sort((a, b) => trueComparison(a.key, b.key));
        for (const { item } of keyedArray) {
            yield item;
        }
    };
}
exports.orderBy = orderBy;
/** Play the given Iterable in reverse order */
function flip(it) {
    return reduce((prev, next) => [next].concat(prev), [])(it);
}
exports.flip = flip;
/** Play the given Iterable, and then it N more times */
function repeat(times) {
    return function* (it) {
        const buffer = [];
        for (const item of it) {
            buffer.push(item);
            yield item;
        }
        for (let i = 0; i < times; ++i) {
            yield* buffer;
        }
    };
}
exports.repeat = repeat;
/** Play the given Iterable, and then play back that Iterable in reverse */
function* doppler(it) {
    const buffer = [];
    for (const item of it) {
        buffer.push(item);
        yield item;
    }
    buffer.reverse();
    yield* buffer;
}
exports.doppler = doppler;
/** Play the given Iterable in a random order */
function shuffle(it, rand = () => Math.random()) {
    return map((x) => x[0])(orderBy((x) => x[1])(map((x) => [x, rand()])(it)));
}
exports.shuffle = shuffle;
//# sourceMappingURL=operators.js.map