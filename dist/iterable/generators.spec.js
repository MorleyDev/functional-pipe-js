"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generators = require("./generators");
const tap_1 = require("tap");
tap_1.test("iterable/generators", test => {
    test.test("defer :: (() -> Iterable T) -> Iterable T", test => {
        let executed = 0;
        const gen = Generators.defer(function* () { executed = executed + 1; yield* [1, 2, 3]; });
        test.equals(executed, 0);
        test.deepEquals(Array.from(gen), [1, 2, 3]);
        test.equals(executed, 1);
        test.deepEquals(Array.from(gen), [1, 2, 3]);
        test.equals(executed, 2);
        test.end();
    });
    test.test("infinite :: () -> Iterable Number", test => {
        const infinite = Generators.infinite();
        const infiniteIterator1 = infinite[Symbol.iterator]();
        for (let i = 0; i < 10; ++i) {
            const { done, value } = infiniteIterator1.next();
            test.false(done);
            test.equal(value, i);
        }
        const infiniteIterator2 = infinite[Symbol.iterator](); // ES6 iterable wrapper prevents state being stored
        for (let i = 0; i < 10; ++i) {
            const { done, value } = infiniteIterator2.next();
            test.false(done);
            test.equal(value, i);
        }
        test.end();
    });
    test.test("infinite :: (startIndex: number) -> Iterable Number", test => {
        const infinite = Generators.infinite(10);
        const infiniteIterator1 = infinite[Symbol.iterator]();
        for (let i = 0; i < 10; ++i) {
            const { done, value } = infiniteIterator1.next();
            test.false(done);
            test.equal(value, 10 + i);
        }
        const infiniteIterator2 = infinite[Symbol.iterator](); // ES6 iterable wrapper prevents state being stored
        for (let i = 0; i < 10; ++i) {
            const { done, value } = infiniteIterator2.next();
            test.false(done);
            test.equal(value, 10 + i);
        }
        test.end();
    });
    test.test("range :: (A, B, inc = 1) -> Iterable N", test => {
        test.test("range :: (A >= 0, B >= 0) -> Iterable [A ... (A + B)]", test => {
            const range = Generators.range(15, 10);
            const runTest = () => {
                const rangeIterator1 = range[Symbol.iterator]();
                for (let i = 15; i < 25; ++i) {
                    const { done, value } = rangeIterator1.next();
                    test.false(done);
                    test.equal(value, i);
                }
                const { done, value } = rangeIterator1.next();
                test.true(done);
                test.equal(value, undefined);
            };
            runTest();
            runTest(); // ES6 iterable wrapper prevents state being stored
            test.end();
        });
        test.test("range :: (A >= 0, B >= 0, inc=2) -> Iterable [A ... (A + B)]", test => {
            const range = Generators.range(15, 10, 2);
            const runTest = () => {
                const rangeIterator1 = range[Symbol.iterator]();
                for (let i = 15; i < 35; i += 2) {
                    const { done, value } = rangeIterator1.next();
                    test.false(done);
                    test.equal(value, i);
                }
                const { done, value } = rangeIterator1.next();
                test.true(done);
                test.equal(value, undefined);
            };
            runTest();
            runTest(); // ES6 iterable wrapper prevents state being stored
            test.end();
        });
        test.test("range :: (A, B < 0) -> Empty", test => {
            const range = Generators.range(15, -10);
            const runTest = () => {
                const rangeIterator1 = range[Symbol.iterator]();
                const { done, value } = rangeIterator1.next();
                test.true(done);
                test.equal(value, undefined);
            };
            runTest();
            runTest();
            test.end();
        });
        test.test("range :: (A < 0, B) -> Iterable [A ... (A + B)]", test => {
            const range = Generators.range(-15, 20);
            const runTest = () => {
                const rangeIterator1 = range[Symbol.iterator]();
                for (let i = -15; i < 5; ++i) {
                    const { done, value } = rangeIterator1.next();
                    test.false(done);
                    test.equal(value, i);
                }
                const { done, value } = rangeIterator1.next();
                test.true(done);
                test.equal(value, undefined);
            };
            runTest();
            runTest();
            test.end();
        });
        test.end();
    });
    test.test("empty :: () -> Empty", test => {
        const empty = Generators.empty();
        const emptyIterator1 = empty[Symbol.iterator]();
        const { done, value } = emptyIterator1.next();
        test.true(done);
        test.equal(value, undefined);
        test.end();
    });
    test.test("concat :: (Iterable T, Iterable T, Iterable T) -> Iterable T", test => {
        const result = Array.from(Generators.concat([0, 3, 1, 2], [9, 5, 1], [5, 5, 5]));
        test.deepEqual(result, [0, 3, 1, 2, 9, 5, 1, 5, 5, 5]);
        test.end();
    });
    test.test("keys :: T -> Iterable [keyof T]", test => {
        const result = Array.from(Generators.keys({ a: 10, b: 20, c: 30, f: 50 })).sort();
        test.deepEqual(result, ["a", "b", "c", "f"]);
        test.end();
    });
    test.test("values :: T -> Iterable T[keyof T]", test => {
        const result = Array.from(Generators.values({ a: 10, b: 20, c: 30, f: 50 })).sort();
        test.deepEqual(result, [10, 20, 30, 50]);
        test.end();
    });
    test.test("fibonacci :: () -> Iterable Number", test => {
        const it = Generators.fibonacci()[Symbol.iterator]();
        test.equals(it.next().value, 1);
        test.equals(it.next().value, 1);
        test.equals(it.next().value, 2);
        test.equals(it.next().value, 3);
        test.equals(it.next().value, 5);
        test.equals(it.next().value, 8);
        test.equals(it.next().value, 13);
        test.equals(it.next().value, 21);
        test.equals(it.next().value, 34);
        test.equals(it.next().value, 55);
        test.equals(it.next().value, 89);
        test.end();
    });
    test.test("primes :: () -> Iterable Number", test => {
        const it = Generators.primes()[Symbol.iterator]();
        test.deepEquals(it.next(), { value: 2, done: false });
        test.deepEquals(it.next(), { value: 3, done: false });
        test.deepEquals(it.next(), { value: 5, done: false });
        test.deepEquals(it.next(), { value: 7, done: false });
        test.deepEquals(it.next(), { value: 11, done: false });
        test.deepEquals(it.next(), { value: 13, done: false });
        test.deepEquals(it.next(), { value: 17, done: false });
        test.deepEquals(it.next(), { value: 19, done: false });
        test.deepEquals(it.next(), { value: 23, done: false });
        test.deepEquals(it.next(), { value: 29, done: false });
        test.end();
    });
    test.test("primes :: (limit: Number) -> Iterable Number", test => {
        const it = Array.from(Generators.primes(30));
        test.deepEquals(it, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
        test.end();
    });
    test.test("zip :: (...Iterable T) -> Iterable Array[T]", test => {
        test.test("zip :: () -> Empty Iterable", test => {
            const result = Array.from(Generators.zip());
            test.deepEquals(result, []);
            test.end();
        });
        test.test("zip :: (... Iterable [T, U]) -> Iterable [T, U]", test => {
            const result = Array.from(Generators.zip([1, 2, 3, 4], ["a", "b", "c"], [2, 3, 4, 5]));
            test.deepEquals(result, [
                [1, "a", 2],
                [2, "b", 3],
                [3, "c", 4]
            ]);
            test.end();
        });
        test.end();
    });
    test.end();
});
//# sourceMappingURL=generators.spec.js.map