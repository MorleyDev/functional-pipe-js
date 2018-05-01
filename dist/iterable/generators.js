"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function range(start, count) {
    return defer(function* () {
        for (let i = 0; i < count; ++i) {
            yield start + i;
        }
    });
}
exports.range = range;
function infinite() {
    return defer(function* () {
        for (let i = 0;; ++i) {
            yield i;
        }
    });
}
exports.infinite = infinite;
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
//# sourceMappingURL=generators.js.map