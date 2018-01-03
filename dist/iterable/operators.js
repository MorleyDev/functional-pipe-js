"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* unit(iterable) {
    return yield* iterable;
}
exports.unit = unit;
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
function fold(predicate) {
    return function (iterable) {
        const [head, ...tail] = Array.from(iterable);
        return reduce(predicate, head)(tail);
    };
}
exports.fold = fold;
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
function last(iterable) {
    let last = undefined;
    for (const item of iterable) {
        last = item;
    }
    return last;
}
exports.last = last;
function first(iterable) {
    for (const item of iterable) {
        return item;
    }
    return undefined;
}
exports.first = first;
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
function concat(...iterables) {
    return function* (it) {
        yield* it;
        for (const iterable of iterables)
            yield* iterable;
    };
}
exports.concat = concat;
function push(...next) {
    return function* (it) {
        yield* it;
        for (const iterable of next)
            yield iterable;
    };
}
exports.push = push;
function unshift(...next) {
    return function* (it) {
        for (let i = 0; i < next.length; ++i)
            yield next[next.length - i - 1];
        yield* it;
    };
}
exports.unshift = unshift;
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
function flip(it) {
    return reduce((prev, next) => [next].concat(prev), [])(it);
}
exports.flip = flip;
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
//# sourceMappingURL=operators.js.map