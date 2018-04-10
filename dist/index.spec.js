"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("tap");
const index_1 = require("./index");
const operators_1 = require("./iterable/operators");
test.test("index", test => {
    const result = index_1.$$("abcdefghijklmnopqrstuvwxyz")
        .$(alphabet => Array.from(alphabet))
        .$(index_1.Iterables.map(letter => letter.toUpperCase()))
        .$(index_1.Maybe.last)
        .$(index_1.Maybes.map(letter => `${letter}abcdefghijklmnopqrstuvwxy`))
        .$(index_1.Iterables.flatMap(str => Array.from(str)))
        .$(index_1.Iterables.flip)
        .$(operators_1.toArray)
        .$$(arr => arr.join(""));
    test.equal(result, "yxwvutsrqponmlkjihgfedcbaZ");
    test.end();
});
//# sourceMappingURL=index.spec.js.map