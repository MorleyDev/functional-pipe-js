"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Operators = require("./operators");
const test = require("tap");
const pipe_1 = require("../pipe");
const operators_1 = require("../iterable/operators");
test.test("promise/operators", test => {
    test.test("then :: (T -> U) -> T -> Promise U", async (test) => {
        const result = await pipe_1.$$(10).$$(Operators.then(x => x * 20));
        test.equals(result, 200);
        test.end();
    });
    test.test("then :: (T -> U) -> Promise T -> Promise U", async (test) => {
        const result = await pipe_1.$$(Promise.resolve(10)).$$(Operators.then(x => x * 20));
        test.equals(result, 200);
        test.end();
    });
    test.test("then :: (T -> Promise U) -> T -> Promise U", async (test) => {
        const result = await pipe_1.$$(10).$$(Operators.then(x => Promise.resolve(x * 20)));
        test.equals(result, 200);
        test.end();
    });
    test.test("then :: (T -> Promise U) -> Promise T -> Promise U", async (test) => {
        const result = await pipe_1.$$(Promise.resolve(10)).$$(Operators.then(x => Promise.resolve(x * 20)));
        test.equals(result, 200);
        test.end();
    });
    test.test("catchError :: (Error -> U) -> T -> Promise T", async (test) => {
        const result = await pipe_1.$$(10).$$(Operators.catchError(x => 100));
        test.equals(result, 10);
        test.end();
    });
    test.test("catchError :: (Error -> U) -> Promise T -> Promise T", async (test) => {
        const result = await pipe_1.$$(Promise.resolve(10)).$$(Operators.catchError(x => 100));
        test.equals(result, 10);
        test.end();
    });
    test.test("catchError :: (Error -> Promise U) -> T -> Promise T", async (test) => {
        const result = await pipe_1.$$(10).$$(Operators.catchError(x => Promise.resolve(100)));
        test.equals(result, 10);
        test.end();
    });
    test.test("catchError :: (Error -> Promise U) -> Promise T -> Promise T", async (test) => {
        const result = await pipe_1.$$(Promise.resolve(10)).$$(Operators.catchError(x => Promise.resolve(100)));
        test.equals(result, 10);
        test.end();
    });
    test.test("catchError :: (Error -> U) -> Error -> Promise U", async (test) => {
        const result = await pipe_1.$$(Promise.reject(10)).$$(Operators.catchError(x => `${x}:${100}`));
        test.equals(result, "10:100");
        test.end();
    });
    test.test("catchError :: (Error -> Promise U) -> Error -> Promise U", async (test) => {
        const result = await pipe_1.$$(Promise.reject(10)).$$(Operators.catchError(x => Promise.resolve(`${x}:${100}`)));
        test.equals(result, "10:100");
        test.end();
    });
    test.test("match :: (Patterns T U) T -> Promise U", async (test) => {
        test.equals(await Operators.match([() => true, x => x.toString()])(10), "10");
        test.equals(await Operators.match([() => true, x => x.toString()])(Promise.resolve(10)), "10");
        test.equals(await Operators.match([() => true, "10"])(10), "10");
        test.equals(await Operators.match([() => true, async (x) => x.toString()])(10), "10");
        test.equals(await Operators.match([() => Promise.resolve(true), "10"])(10), "10");
        test.equals(await Operators.match([(x) => false, 25], [(x) => Promise.resolve(true), "10"])(Promise.resolve(10)), "10");
        test.equals(await Operators.match([11, "26"], [10, "25"], [12, "55"], [() => true, ""])(10), "25");
        test.equals(await Operators.match([async (x) => x !== 10, "26"], [async (x) => x === 10, "25"], [12, "55"], [() => true, ""])(10), "25");
        test.equals(await Operators.match([x => x !== 10, "26"], [x => x === 10, "25"], [12, "55"], [() => true, ""])(10), "25");
        test.equals(await Operators.match([x => x !== 10, "26"], [x => x === 10, x => (x + 15).toString()], [12, "55"], [() => true, () => ""])(10), "25");
        test.equals(await Operators.match([async (x) => x !== 10, "26"], [async (x) => x === 10, async (x) => (x + 15).toString()], [12, "55"], [() => true, async () => ""])(10), "25");
        test.equals(await Operators.match([10, "25"], [() => true, ""])(10), "25");
        test.end();
    });
    test.test("maybeMatch :: (Patterns T U) T -> Promise Maybe U", async (test) => {
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([(x) => true, x => x.toString()])(10)), ["10"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([(x) => true, x => x.toString()])(Promise.resolve(10))), ["10"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([(x) => true, "10"])(10)), ["10"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([(x) => true, async (x) => x.toString()])(10)), ["10"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([(x) => Promise.resolve(true), "10"])(10)), ["10"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([(x) => false, "25"], [(x) => Promise.resolve(true), "10"])(Promise.resolve(10))), ["10"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([11, "26"], [10, "25"], [12, "55"], [() => true, ""])(10)), ["25"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([async (x) => x !== 10, "26"], [async (x) => x === 10, "25"], [12, "55"], [() => true, ""])(10)), ["25"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([x => x !== 10, "26"], [x => x === 10, "25"], [12, "55"], [() => true, ""])(10)), ["25"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([x => x !== 10, "26"], [x => x === 10, x => (x + 15).toString()], [12, "55"], [() => true, () => ""])(10)), ["25"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([async (x) => x !== 10, "26"], [async (x) => x === 10, async (x) => (x + 15).toString()], [12, "55"], [x => true, async () => ""])(10)), ["25"]);
        test.deepEquals(operators_1.toArray(await Operators.maybeMatch([10, "25"], [() => true, ""])(10)), ["25"]);
        test.end();
    });
    test.end();
});
//# sourceMappingURL=operators.spec.js.map