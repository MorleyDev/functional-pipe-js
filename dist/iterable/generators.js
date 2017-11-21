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
    function* range(start, count) {
        for (let i = 0; i < count; ++i) {
            yield start + i;
        }
    }
    exports.range = range;
    function* infinite() {
        for (let i = 0;; ++i) {
            yield i;
        }
    }
    exports.infinite = infinite;
    function* empty() { }
    exports.empty = empty;
    function* concat(...iterables) {
        for (const iterable of iterables) {
            yield* iterable;
        }
    }
    exports.concat = concat;
    function* keys(item) {
        for (const key in item) {
            yield key;
        }
    }
    exports.keys = keys;
});
//# sourceMappingURL=generators.js.map