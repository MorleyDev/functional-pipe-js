(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function* unit(iterable) {
        return yield* iterable;
    }
    exports.unit = unit;
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
    function takeWhile(predicate) {
        return function* (iterable) {
            let i = 0;
            for (const item of iterable) {
                if (!predicate(item, i)) {
                    return;
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
    function last(iterable) {
        let last = undefined;
        for (const item of iterable) {
            last = item;
        }
        return last;
    }
    exports.last = last;
    function skip(count) {
        return function* (iterable) {
            let i = 0;
            for (const item of iterable) {
                if (i >= count) {
                    yield* iterable;
                }
                i = i + 1;
            }
        };
    }
    exports.skip = skip;
    function skipWhile(predicate) {
        return function* (iterable) {
            let i = 0;
            for (const item of iterable) {
                if (!predicate(item, i)) {
                    return yield* iterable;
                }
                i = i + 1;
            }
        };
    }
    exports.skipWhile = skipWhile;
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
            for (const iterable of next)
                yield iterable;
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
});
//# sourceMappingURL=operators.js.map