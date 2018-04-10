"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeneratorIterable {
    constructor(generator) {
        this.generator = generator;
    }
    [Symbol.iterator]() {
        const result = this.generator();
        return result[Symbol.iterator]();
    }
}
function range(start, count) {
    return new GeneratorIterable(function* () {
        for (let i = 0; i < count; ++i) {
            yield start + i;
        }
    });
}
exports.range = range;
function infinite() {
    return new GeneratorIterable(function* () {
        for (let i = 0;; ++i) {
            yield i;
        }
    });
}
exports.infinite = infinite;
function* empty() { }
exports.empty = empty;
function concat(...iterables) {
    return new GeneratorIterable(function* () {
        for (const iterable of iterables) {
            yield* iterable;
        }
    });
}
exports.concat = concat;
function keys(item) {
    return new GeneratorIterable(function* () {
        for (const key in item) {
            yield key;
        }
    });
}
exports.keys = keys;
function values(item) {
    return new GeneratorIterable(function* () {
        for (const key in item) {
            yield item[key];
        }
    });
}
exports.values = values;
//# sourceMappingURL=generators.js.map