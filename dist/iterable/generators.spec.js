"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generators = require("./generators");
const tap_1 = require("tap");
tap_1.test("iterable/generators", test => {
    test.test("infinite :: () -> Iterable[Number]", test => {
        const infinite = Generators.infinite();
        const infiniteIterator1 = infinite[Symbol.iterator]();
        for (let i = 0; i < 10; ++i) {
            const { done, value } = infiniteIterator1.next();
            test.false(done);
            test.equal(value, i);
        }
        const infiniteIterator2 = infinite[Symbol.iterator](); // ES6 iterables are horribly stateful
        for (let i = 10; i < 20; ++i) {
            const { done, value } = infiniteIterator2.next();
            test.false(done);
            test.equal(value, i);
        }
        test.end();
    });
    test.test("range :: (Number, Number) -> Iterable[Number]", test => {
        test.test("range :: (A: Number >= 0, B: Number >= 0) -> Iterable[A ... (A + B)]", test => {
            const range = Generators.range(15, 10);
            const rangeIterator1 = range[Symbol.iterator]();
            for (let i = 15; i < 25; ++i) {
                const { done, value } = rangeIterator1.next();
                test.false(done);
                test.equal(value, i);
            }
            const { done, value } = rangeIterator1.next();
            test.true(done);
            test.equal(value, undefined);
            test.end();
        });
        test.test("range :: (A: Number < 0, B: Number >= 0) -> Iterable[A ... (A + B)]", test => {
            const range = Generators.range(15, -10);
            const rangeIterator1 = range[Symbol.iterator]();
            const { done, value } = rangeIterator1.next();
            test.true(done);
            test.equal(value, undefined);
            test.end();
        });
        test.test("range :: (Number, B: Number < 0) -> Iterable[]", test => {
            const range = Generators.range(15, -10);
            const rangeIterator1 = range[Symbol.iterator]();
            const { done, value } = rangeIterator1.next();
            test.true(done);
            test.equal(value, undefined);
            test.end();
        });
        test.end();
    });
    test.test("empty :: () -> Iterable[]", test => {
        const empty = Generators.empty();
        const emptyIterator1 = empty[Symbol.iterator]();
        const { done, value } = emptyIterator1.next();
        test.true(done);
        test.equal(value, undefined);
        test.end();
    });
    test.test("concat :: (Iterable[T], Iterable[T], Iterable[T]) -> Iterable[T]", test => {
        const result = Array.from(Generators.concat([0, 3, 1, 2], [9, 5, 1], [5, 5, 5]));
        test.deepEqual(result, [0, 3, 1, 2, 9, 5, 1, 5, 5, 5]);
        test.end();
    });
    test.test("keys :: T -> Iterable[keyof T]", test => {
        const result = Array.from(Generators.keys({ a: 10, b: 20, c: 30, f: 50 })).sort();
        test.deepEqual(result, ["a", "b", "c", "f"]);
        test.end();
    });
    test.test("values :: T -> Iterable[T[keyof T]]", test => {
        const result = Array.from(Generators.values({ a: 10, b: 20, c: 30, f: 50 })).sort();
        test.deepEqual(result, [10, 20, 30, 50]);
        test.end();
    });
    test.end();
});
//# sourceMappingURL=generators.spec.js.map