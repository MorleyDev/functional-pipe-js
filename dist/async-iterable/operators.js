"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", { value: true });
/** Yield the original sequence unmodified */
function identity(iterable) {
    return __asyncGenerator(this, arguments, function* identity_1() {
        return yield __await(yield* __asyncDelegator(__asyncValues(iterable)));
    });
}
exports.identity = identity;
/** Yield the original sequence unmodified, calling the tapper on every item in the sequence */
function tap(tapper) {
    return function (it) {
        return __asyncGenerator(this, arguments, function* () {
            let index = 0;
            try {
                for (var it_1 = __asyncValues(it), it_1_1; it_1_1 = yield __await(it_1.next()), !it_1_1.done;) {
                    const value = yield __await(it_1_1.value);
                    yield __await(tapper(value, index));
                    yield value;
                    index = index + 1;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (it_1_1 && !it_1_1.done && (_a = it_1.return)) yield __await(_a.call(it_1));
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _a;
        });
    };
}
exports.tap = tap;
/** Yield a new iterable sequence that applies the mapper to every item in the original */
function map(mapper) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            let index = 0;
            try {
                for (var iterable_1 = __asyncValues(iterable), iterable_1_1; iterable_1_1 = yield __await(iterable_1.next()), !iterable_1_1.done;) {
                    const value = yield __await(iterable_1_1.value);
                    yield mapper(value, index);
                    index = index + 1;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) yield __await(_a.call(iterable_1));
                }
                finally { if (e_2) throw e_2.error; }
            }
            var e_2, _a;
        });
    };
}
exports.map = map;
/** Yield all items in every iterable returned by the mapper when applied to every item in the source iterable */
function flatMap(mapper) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            let index = 0;
            try {
                for (var iterable_2 = __asyncValues(iterable), iterable_2_1; iterable_2_1 = yield __await(iterable_2.next()), !iterable_2_1.done;) {
                    const value = yield __await(iterable_2_1.value);
                    const innerAsyncIterableProm = mapper(value, index);
                    try {
                        for (var innerAsyncIterableProm_1 = __asyncValues(innerAsyncIterableProm), innerAsyncIterableProm_1_1; innerAsyncIterableProm_1_1 = yield __await(innerAsyncIterableProm_1.next()), !innerAsyncIterableProm_1_1.done;) {
                            const inner = yield __await(innerAsyncIterableProm_1_1.value);
                            yield inner;
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (innerAsyncIterableProm_1_1 && !innerAsyncIterableProm_1_1.done && (_a = innerAsyncIterableProm_1.return)) yield __await(_a.call(innerAsyncIterableProm_1));
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    index = index + 1;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (iterable_2_1 && !iterable_2_1.done && (_b = iterable_2.return)) yield __await(_b.call(iterable_2));
                }
                finally { if (e_4) throw e_4.error; }
            }
            var e_4, _b, e_3, _a;
        });
    };
}
exports.flatMap = flatMap;
/** Yield only the items in an iterable sequence that match the predicate */
function filter(predicate) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            let index = 0;
            try {
                for (var iterable_3 = __asyncValues(iterable), iterable_3_1; iterable_3_1 = yield __await(iterable_3.next()), !iterable_3_1.done;) {
                    const value = yield __await(iterable_3_1.value);
                    if (yield __await(predicate(value, index))) {
                        yield value;
                    }
                    index = index + 1;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (iterable_3_1 && !iterable_3_1.done && (_a = iterable_3.return)) yield __await(_a.call(iterable_3));
                }
                finally { if (e_5) throw e_5.error; }
            }
            var e_5, _a;
        });
    };
}
exports.filter = filter;
/** Reduce the items in an iterable down to a single instance of initial type, returning the final result result of the reduction */
function reduce(predicate, initial) {
    return async function (iterable) {
        let index = 0;
        let prevState = initial;
        try {
            for (var iterable_4 = __asyncValues(iterable), iterable_4_1; iterable_4_1 = await iterable_4.next(), !iterable_4_1.done;) {
                const value = await iterable_4_1.value;
                prevState = await predicate(prevState, value, index);
                index = index + 1;
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (iterable_4_1 && !iterable_4_1.done && (_a = iterable_4.return)) await _a.call(iterable_4);
            }
            finally { if (e_6) throw e_6.error; }
        }
        return prevState;
        var e_6, _a;
    };
}
exports.reduce = reduce;
/** Reduce the items in an iterable down to a single instance of initial type, yielding each step of the reduction */
function scan(predicate, initial) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            let index = 0;
            let prevState = initial;
            try {
                for (var iterable_5 = __asyncValues(iterable), iterable_5_1; iterable_5_1 = yield __await(iterable_5.next()), !iterable_5_1.done;) {
                    const value = yield __await(iterable_5_1.value);
                    prevState = yield __await(Promise.resolve(predicate(prevState, value, index)));
                    yield prevState;
                    index = index + 1;
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (iterable_5_1 && !iterable_5_1.done && (_a = iterable_5.return)) yield __await(_a.call(iterable_5));
                }
                finally { if (e_7) throw e_7.error; }
            }
            return prevState;
            var e_7, _a;
        });
    };
}
exports.scan = scan;
/** Reduce the items in an iterable down to a single instance of the same type as the type contained by that AsyncIterable */
function fold(predicate) {
    return async function (iterable) {
        let index = 0;
        let prevState;
        try {
            for (var iterable_6 = __asyncValues(iterable), iterable_6_1; iterable_6_1 = await iterable_6.next(), !iterable_6_1.done;) {
                const value = await iterable_6_1.value;
                if (index == 0) {
                    prevState = value;
                }
                else {
                    prevState = await predicate(prevState, value, index);
                }
                index = index + 1;
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (iterable_6_1 && !iterable_6_1.done && (_a = iterable_6.return)) await _a.call(iterable_6);
            }
            finally { if (e_8) throw e_8.error; }
        }
        return prevState;
        var e_8, _a;
    };
}
exports.fold = fold;
/** Take and yield the first N items in an iterable sequence */
function take(count) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            let i = 0;
            try {
                for (var iterable_7 = __asyncValues(iterable), iterable_7_1; iterable_7_1 = yield __await(iterable_7.next()), !iterable_7_1.done;) {
                    const item = yield __await(iterable_7_1.value);
                    if (i >= count) {
                        return;
                    }
                    yield item;
                    i = i + 1;
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (iterable_7_1 && !iterable_7_1.done && (_a = iterable_7.return)) yield __await(_a.call(iterable_7));
                }
                finally { if (e_9) throw e_9.error; }
            }
            var e_9, _a;
        });
    };
}
exports.take = take;
/** Take only the last N items in an iterable sequence */
function takeLast(count) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            const buffer = [];
            try {
                for (var iterable_8 = __asyncValues(iterable), iterable_8_1; iterable_8_1 = yield __await(iterable_8.next()), !iterable_8_1.done;) {
                    const item = yield __await(iterable_8_1.value);
                    buffer.push(item);
                    if (buffer.length > count) {
                        buffer.shift();
                    }
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (iterable_8_1 && !iterable_8_1.done && (_a = iterable_8.return)) yield __await(_a.call(iterable_8));
                }
                finally { if (e_10) throw e_10.error; }
            }
            return yield __await(yield* __asyncDelegator(__asyncValues(buffer)));
            var e_10, _a;
        });
    };
}
exports.takeLast = takeLast;
/** Take everything but the last N items in an iterable sequence */
function skipLast(count) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            const buffer = [];
            try {
                for (var iterable_9 = __asyncValues(iterable), iterable_9_1; iterable_9_1 = yield __await(iterable_9.next()), !iterable_9_1.done;) {
                    const item = yield __await(iterable_9_1.value);
                    buffer.push(item);
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (iterable_9_1 && !iterable_9_1.done && (_a = iterable_9.return)) yield __await(_a.call(iterable_9));
                }
                finally { if (e_11) throw e_11.error; }
            }
            if (buffer.length < count) {
                return;
            }
            yield __await(yield* __asyncDelegator(__asyncValues(buffer.slice(0, buffer.length - count))));
            var e_11, _a;
        });
    };
}
exports.skipLast = skipLast;
/** Take only the last item in an iterable sequence */
async function last(iterable) {
    let last = undefined;
    try {
        for (var iterable_10 = __asyncValues(iterable), iterable_10_1; iterable_10_1 = await iterable_10.next(), !iterable_10_1.done;) {
            const item = await iterable_10_1.value;
            last = item;
        }
    }
    catch (e_12_1) { e_12 = { error: e_12_1 }; }
    finally {
        try {
            if (iterable_10_1 && !iterable_10_1.done && (_a = iterable_10.return)) await _a.call(iterable_10);
        }
        finally { if (e_12) throw e_12.error; }
    }
    return last;
    var e_12, _a;
}
exports.last = last;
/** Take only the first item in an iterable sequence */
async function first(iterable) {
    try {
        for (var iterable_11 = __asyncValues(iterable), iterable_11_1; iterable_11_1 = await iterable_11.next(), !iterable_11_1.done;) {
            const item = await iterable_11_1.value;
            return item;
        }
    }
    catch (e_13_1) { e_13 = { error: e_13_1 }; }
    finally {
        try {
            if (iterable_11_1 && !iterable_11_1.done && (_a = iterable_11.return)) await _a.call(iterable_11);
        }
        finally { if (e_13) throw e_13.error; }
    }
    return undefined;
    var e_13, _a;
}
exports.first = first;
/** Skip the first N items in a iterable sequence, and then yield the remaining items */
function skip(count) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            let i = 0;
            try {
                for (var iterable_12 = __asyncValues(iterable), iterable_12_1; iterable_12_1 = yield __await(iterable_12.next()), !iterable_12_1.done;) {
                    const item = yield __await(iterable_12_1.value);
                    if (i >= count) {
                        yield item;
                    }
                    i = i + 1;
                }
            }
            catch (e_14_1) { e_14 = { error: e_14_1 }; }
            finally {
                try {
                    if (iterable_12_1 && !iterable_12_1.done && (_a = iterable_12.return)) yield __await(_a.call(iterable_12));
                }
                finally { if (e_14) throw e_14.error; }
            }
            var e_14, _a;
        });
    };
}
exports.skip = skip;
/** Take and yield items in an iterable until the passed predicate fails, then abort the sequence */
function takeWhile(predicate) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            let i = 0;
            try {
                for (var iterable_13 = __asyncValues(iterable), iterable_13_1; iterable_13_1 = yield __await(iterable_13.next()), !iterable_13_1.done;) {
                    const item = yield __await(iterable_13_1.value);
                    if (!(yield __await(Promise.resolve(predicate(item, i))))) {
                        break;
                    }
                    yield item;
                    i = i + 1;
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (iterable_13_1 && !iterable_13_1.done && (_a = iterable_13.return)) yield __await(_a.call(iterable_13));
                }
                finally { if (e_15) throw e_15.error; }
            }
            var e_15, _a;
        });
    };
}
exports.takeWhile = takeWhile;
/** Take and yield items in an iterable until the passed predicate passes, then abort the sequence */
function takeUntil(predicate) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            let i = 0;
            try {
                for (var iterable_14 = __asyncValues(iterable), iterable_14_1; iterable_14_1 = yield __await(iterable_14.next()), !iterable_14_1.done;) {
                    const item = yield __await(iterable_14_1.value);
                    if (yield __await(predicate(item, i))) {
                        return;
                    }
                    yield item;
                    i = i + 1;
                }
            }
            catch (e_16_1) { e_16 = { error: e_16_1 }; }
            finally {
                try {
                    if (iterable_14_1 && !iterable_14_1.done && (_a = iterable_14.return)) yield __await(_a.call(iterable_14));
                }
                finally { if (e_16) throw e_16.error; }
            }
            var e_16, _a;
        });
    };
}
exports.takeUntil = takeUntil;
/** Skip items in an iterable until the passed predicate fails, then yield all items in the iterable */
function skipWhile(predicate) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            let i = 0;
            let canReturn = false;
            try {
                for (var iterable_15 = __asyncValues(iterable), iterable_15_1; iterable_15_1 = yield __await(iterable_15.next()), !iterable_15_1.done;) {
                    const item = yield __await(iterable_15_1.value);
                    if (!canReturn) {
                        canReturn = !(yield __await(Promise.resolve(predicate(item, i))));
                        if (canReturn) {
                            yield item;
                        }
                        i = i + 1;
                    }
                    else {
                        yield item;
                    }
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (iterable_15_1 && !iterable_15_1.done && (_a = iterable_15.return)) yield __await(_a.call(iterable_15));
                }
                finally { if (e_17) throw e_17.error; }
            }
            var e_17, _a;
        });
    };
}
exports.skipWhile = skipWhile;
/** Skip items in an iterable until the passed predicate matches, then yield all items in the iterable */
function skipUntil(predicate) {
    return function (iterable) {
        return __asyncGenerator(this, arguments, function* () {
            let i = 0;
            let canReturn = false;
            try {
                for (var iterable_16 = __asyncValues(iterable), iterable_16_1; iterable_16_1 = yield __await(iterable_16.next()), !iterable_16_1.done;) {
                    const item = yield __await(iterable_16_1.value);
                    if (!canReturn) {
                        canReturn = yield __await(predicate(item, i));
                        if (canReturn) {
                            yield item;
                        }
                        i = i + 1;
                    }
                    else {
                        yield item;
                    }
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (iterable_16_1 && !iterable_16_1.done && (_a = iterable_16.return)) yield __await(_a.call(iterable_16));
                }
                finally { if (e_18) throw e_18.error; }
            }
            var e_18, _a;
        });
    };
}
exports.skipUntil = skipUntil;
/** Enumerate until index and return the element at index, or consumes and return undefined */
function elementAtOrDefault(index, or) {
    return async function (it) {
        let i = 0;
        try {
            for (var it_2 = __asyncValues(it), it_2_1; it_2_1 = await it_2.next(), !it_2_1.done;) {
                const item = await it_2_1.value;
                if (i === index) {
                    return item;
                }
                i = i + 1;
            }
        }
        catch (e_19_1) { e_19 = { error: e_19_1 }; }
        finally {
            try {
                if (it_2_1 && !it_2_1.done && (_a = it_2.return)) await _a.call(it_2);
            }
            finally { if (e_19) throw e_19.error; }
        }
        return or;
        var e_19, _a;
    };
}
exports.elementAtOrDefault = elementAtOrDefault;
/** Yields the passed iterables at the end of the current iterable */
function concat(...iterables) {
    return function (it) {
        return __asyncGenerator(this, arguments, function* () {
            yield __await(yield* __asyncDelegator(__asyncValues(it)));
            try {
                for (var iterables_1 = __asyncValues(iterables), iterables_1_1; iterables_1_1 = yield __await(iterables_1.next()), !iterables_1_1.done;) {
                    const iterable = yield __await(iterables_1_1.value);
                    yield __await(yield* __asyncDelegator(__asyncValues(iterable)));
                }
            }
            catch (e_20_1) { e_20 = { error: e_20_1 }; }
            finally {
                try {
                    if (iterables_1_1 && !iterables_1_1.done && (_a = iterables_1.return)) yield __await(_a.call(iterables_1));
                }
                finally { if (e_20) throw e_20.error; }
            }
            var e_20, _a;
        });
    };
}
exports.concat = concat;
/** Append an item to the end of an iterable */
function push(...next) {
    return function (it) {
        return __asyncGenerator(this, arguments, function* () {
            yield __await(yield* __asyncDelegator(__asyncValues(it)));
            try {
                for (var next_1 = __asyncValues(next), next_1_1; next_1_1 = yield __await(next_1.next()), !next_1_1.done;) {
                    const iterable = yield __await(next_1_1.value);
                    yield iterable;
                }
            }
            catch (e_21_1) { e_21 = { error: e_21_1 }; }
            finally {
                try {
                    if (next_1_1 && !next_1_1.done && (_a = next_1.return)) yield __await(_a.call(next_1));
                }
                finally { if (e_21) throw e_21.error; }
            }
            var e_21, _a;
        });
    };
}
exports.push = push;
/** Prepend an item to the beginning of an iterable */
function unshift(...next) {
    return function (it) {
        return __asyncGenerator(this, arguments, function* () {
            for (let i = 0; i < next.length; ++i)
                yield next[next.length - i - 1];
            yield __await(yield* __asyncDelegator(__asyncValues(it)));
        });
    };
}
exports.unshift = unshift;
/** True if at least one item in a sequence matches the given predicate */
function some(predicate) {
    return async (it) => {
        let i = 0;
        try {
            for (var it_3 = __asyncValues(it), it_3_1; it_3_1 = await it_3.next(), !it_3_1.done;) {
                const item = await it_3_1.value;
                if (await predicate(item, i)) {
                    return true;
                }
                i = i + 1;
            }
        }
        catch (e_22_1) { e_22 = { error: e_22_1 }; }
        finally {
            try {
                if (it_3_1 && !it_3_1.done && (_a = it_3.return)) await _a.call(it_3);
            }
            finally { if (e_22) throw e_22.error; }
        }
        return false;
        var e_22, _a;
    };
}
exports.some = some;
/** True if every item in a sequence matches the given predicate */
function every(predicate) {
    return async (it) => {
        let i = 0;
        try {
            for (var it_4 = __asyncValues(it), it_4_1; it_4_1 = await it_4.next(), !it_4_1.done;) {
                const item = await it_4_1.value;
                if (!await Promise.resolve(predicate(item, i))) {
                    return false;
                }
                i = i + 1;
            }
        }
        catch (e_23_1) { e_23 = { error: e_23_1 }; }
        finally {
            try {
                if (it_4_1 && !it_4_1.done && (_a = it_4.return)) await _a.call(it_4);
            }
            finally { if (e_23) throw e_23.error; }
        }
        return true;
        var e_23, _a;
    };
}
exports.every = every;
/** Play unique items from a set */
function distinct(it) {
    return __asyncGenerator(this, arguments, function* distinct_1() {
        const resultSet = new Set();
        try {
            for (var it_5 = __asyncValues(it), it_5_1; it_5_1 = yield __await(it_5.next()), !it_5_1.done;) {
                const item = yield __await(it_5_1.value);
                if (!resultSet.has(item)) {
                    resultSet.add(item);
                    yield item;
                }
            }
        }
        catch (e_24_1) { e_24 = { error: e_24_1 }; }
        finally {
            try {
                if (it_5_1 && !it_5_1.done && (_a = it_5.return)) yield __await(_a.call(it_5));
            }
            finally { if (e_24) throw e_24.error; }
        }
        var e_24, _a;
    });
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
    return function (item) {
        return __asyncGenerator(this, arguments, function* () {
            const keyedMapper = map((item, index) => ({ item, key: trueKeySelector(item, index) }));
            const keyed = keyedMapper(item);
            const keyedArray = yield __await(toWriteableArray(keyed));
            keyedArray.sort((a, b) => trueComparison(a.key, b.key));
            try {
                for (var keyedArray_1 = __asyncValues(keyedArray), keyedArray_1_1; keyedArray_1_1 = yield __await(keyedArray_1.next()), !keyedArray_1_1.done;) {
                    const { item } = yield __await(keyedArray_1_1.value);
                    yield item;
                }
            }
            catch (e_25_1) { e_25 = { error: e_25_1 }; }
            finally {
                try {
                    if (keyedArray_1_1 && !keyedArray_1_1.done && (_a = keyedArray_1.return)) yield __await(_a.call(keyedArray_1));
                }
                finally { if (e_25) throw e_25.error; }
            }
            var e_25, _a;
        });
    };
}
exports.orderBy = orderBy;
/** Play the given AsyncIterable in reverse order */
function flip(it) {
    return __asyncGenerator(this, arguments, function* flip_1() {
        yield __await(yield* __asyncDelegator(__asyncValues(yield __await(reduce((prev, next) => [next].concat(prev), [])(it)))));
    });
}
exports.flip = flip;
/** Play the given AsyncIterable, and then it N more times */
function repeat(times) {
    return function (it) {
        return __asyncGenerator(this, arguments, function* () {
            const buffer = [];
            try {
                for (var it_6 = __asyncValues(it), it_6_1; it_6_1 = yield __await(it_6.next()), !it_6_1.done;) {
                    const item = yield __await(it_6_1.value);
                    buffer.push(item);
                    yield item;
                }
            }
            catch (e_26_1) { e_26 = { error: e_26_1 }; }
            finally {
                try {
                    if (it_6_1 && !it_6_1.done && (_a = it_6.return)) yield __await(_a.call(it_6));
                }
                finally { if (e_26) throw e_26.error; }
            }
            for (let i = 0; i < times; ++i) {
                yield __await(yield* __asyncDelegator(__asyncValues(buffer)));
            }
            var e_26, _a;
        });
    };
}
exports.repeat = repeat;
/** Play the given AsyncIterable, and then play back that AsyncIterable in reverse */
function doppler(it) {
    return __asyncGenerator(this, arguments, function* doppler_1() {
        const buffer = [];
        try {
            for (var it_7 = __asyncValues(it), it_7_1; it_7_1 = yield __await(it_7.next()), !it_7_1.done;) {
                const item = yield __await(it_7_1.value);
                buffer.push(item);
                yield item;
            }
        }
        catch (e_27_1) { e_27 = { error: e_27_1 }; }
        finally {
            try {
                if (it_7_1 && !it_7_1.done && (_a = it_7.return)) yield __await(_a.call(it_7));
            }
            finally { if (e_27) throw e_27.error; }
        }
        buffer.reverse();
        yield __await(yield* __asyncDelegator(__asyncValues(buffer)));
        var e_27, _a;
    });
}
exports.doppler = doppler;
/** Play the given AsyncIterable in a random order */
function shuffle(it, rand = () => Math.random()) {
    return map((x) => x[0])(orderBy((x) => x[1])(map((x) => [x, rand()])(it)));
}
exports.shuffle = shuffle;
/** Return the specified iterable if the source iterable is empty */
function or(other) {
    return function (source) {
        return __asyncGenerator(this, arguments, function* () {
            let hasYieldedItem = false;
            try {
                for (var source_1 = __asyncValues(source), source_1_1; source_1_1 = yield __await(source_1.next()), !source_1_1.done;) {
                    const item = yield __await(source_1_1.value);
                    yield item;
                    hasYieldedItem = true;
                }
            }
            catch (e_28_1) { e_28 = { error: e_28_1 }; }
            finally {
                try {
                    if (source_1_1 && !source_1_1.done && (_a = source_1.return)) yield __await(_a.call(source_1));
                }
                finally { if (e_28) throw e_28.error; }
            }
            if (!hasYieldedItem) {
                yield __await(yield* __asyncDelegator(__asyncValues(other)));
            }
            var e_28, _a;
        });
    };
}
exports.or = or;
/** Evaluate the entire iterable to a readonly array. Provided as type deduction seems to fail when using Array.from to accomplish this outside of a lamda */
async function toArray(iterable) {
    const blob = [];
    try {
        for (var iterable_17 = __asyncValues(iterable), iterable_17_1; iterable_17_1 = await iterable_17.next(), !iterable_17_1.done;) {
            const it = await iterable_17_1.value;
            blob.push(it);
        }
    }
    catch (e_29_1) { e_29 = { error: e_29_1 }; }
    finally {
        try {
            if (iterable_17_1 && !iterable_17_1.done && (_a = iterable_17.return)) await _a.call(iterable_17);
        }
        finally { if (e_29) throw e_29.error; }
    }
    return blob;
    var e_29, _a;
}
exports.toArray = toArray;
/** Evaluate the entire iterable to a readonly array. Provided as type deduction seems to fail when using Array.from to accomplish this outside of a lamda */
async function toWriteableArray(iterable) {
    const blob = [];
    try {
        for (var iterable_18 = __asyncValues(iterable), iterable_18_1; iterable_18_1 = await iterable_18.next(), !iterable_18_1.done;) {
            const it = await iterable_18_1.value;
            blob.push(it);
        }
    }
    catch (e_30_1) { e_30 = { error: e_30_1 }; }
    finally {
        try {
            if (iterable_18_1 && !iterable_18_1.done && (_a = iterable_18.return)) await _a.call(iterable_18);
        }
        finally { if (e_30) throw e_30.error; }
    }
    return blob;
    var e_30, _a;
}
exports.toWriteableArray = toWriteableArray;
/** Replaces the value of an item at the specified index, returning the new iterable set */
function updateAt(index, value) {
    return function (source) {
        return __asyncGenerator(this, arguments, function* () {
            let i = 0;
            try {
                for (var source_2 = __asyncValues(source), source_2_1; source_2_1 = yield __await(source_2.next()), !source_2_1.done;) {
                    const item = yield __await(source_2_1.value);
                    if (i === index) {
                        yield value;
                    }
                    else {
                        yield item;
                    }
                    i = i + 1;
                }
            }
            catch (e_31_1) { e_31 = { error: e_31_1 }; }
            finally {
                try {
                    if (source_2_1 && !source_2_1.done && (_a = source_2.return)) yield __await(_a.call(source_2));
                }
                finally { if (e_31) throw e_31.error; }
            }
            var e_31, _a;
        });
    };
}
exports.updateAt = updateAt;
/** Returns a new iterable set that does not have the element at index */
function removeAt(index) {
    return function (source) {
        return __asyncGenerator(this, arguments, function* () {
            let i = 0;
            try {
                for (var source_3 = __asyncValues(source), source_3_1; source_3_1 = yield __await(source_3.next()), !source_3_1.done;) {
                    const item = yield __await(source_3_1.value);
                    if (i !== index) {
                        yield item;
                    }
                    i = i + 1;
                }
            }
            catch (e_32_1) { e_32 = { error: e_32_1 }; }
            finally {
                try {
                    if (source_3_1 && !source_3_1.done && (_a = source_3.return)) yield __await(_a.call(source_3));
                }
                finally { if (e_32) throw e_32.error; }
            }
            var e_32, _a;
        });
    };
}
exports.removeAt = removeAt;
//# sourceMappingURL=operators.js.map