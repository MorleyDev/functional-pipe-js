"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Maybes = require("./operators");
const maybe_1 = require("../maybe");
const operators_1 = require("./operators");
const tap_1 = require("tap");
tap_1.test("maybe/operators", test => {
    test.test("map :: (T - > U) -> Maybe T -> Maybe U", test => {
        test.test("match :: { just: T -> U, nothing: () -> U } -> Maybe T -> U", test => {
            test.test("match :: { just: T -> U, nothing: () -> U } -> just T -> U", test => {
                const result = operators_1.match({
                    just: (value) => `${value * 2.5}`,
                    nothing: () => "error"
                })(maybe_1.just(10));
                test.equals(result, "25");
                test.end();
            });
            test.test("match :: { just: T -> U, nothing: () -> U } -> nothing -> U", test => {
                const result = operators_1.match({
                    just: (value) => "error",
                    nothing: () => "success"
                })(maybe_1.nothing());
                test.equals(result, "success");
                test.end();
            });
            test.end();
        });
        test.test("map :: (T -> U) -> just T -> just U", test => {
            const result = Maybes.map((x) => `${x * 1.5}`)(maybe_1.just(15));
            test.deepEqual(Array.from(result), ["22.5"]);
            test.end();
        });
        test.test("map :: (T -> U) -> nothing -> nothing", test => {
            const result = Maybes.map((x) => `${x * 1.5}`)(maybe_1.nothing());
            test.deepEqual(Array.from(result), []);
            test.end();
        });
        test.test("flatMap :: (T -> Maybe U) -> Maybe T -> Maybe U", test => {
            test.test("flatMap :: (T -> just U) -> just T -> just U", test => {
                const result = Maybes.flatMap((value) => maybe_1.just(value + 5))(maybe_1.just(10));
                test.deepEqual(Array.from(result), [15]);
                test.end();
            });
            test.test("flatMap :: (T -> nothing) -> just T -> nothing", test => {
                const result = Maybes.flatMap((value) => maybe_1.nothing())(maybe_1.just(10));
                test.deepEqual(Array.from(result), []);
                test.end();
            });
            test.test("flatMap :: (T -> just U) -> nothing -> nothing", test => {
                const result = Maybes.flatMap((value) => maybe_1.just(value + 5))(maybe_1.nothing());
                test.deepEqual(Array.from(result), []);
                test.end();
            });
            test.end();
        });
        test.test("filter :: (T -> Boolean) -> Maybe T -> Maybe T", test => {
            test.test("filter :: (T -> true) -> just T -> just T", test => {
                const result = Maybes.filter((value) => value === "testVal")(maybe_1.just("testVal"));
                test.deepEquals(Array.from(result), ["testVal"]);
                test.end();
            });
            test.test("filter :: (T -> false) -> just T -> nothing", test => {
                const result = Maybes.filter((value) => value !== "testVal")(maybe_1.just("testVal"));
                test.deepEquals(Array.from(result), []);
                test.end();
            });
            test.test("filter :: (T -> boolean) -> nothing -> nothing", test => {
                const result = Maybes.filter((value) => true)(maybe_1.nothing());
                test.deepEquals(Array.from(result), []);
                test.end();
            });
            test.end();
        });
        test.test("or :: Maybe U -> Maybe T -> Maybe (T | U)", test => {
            test.test("or :: just U -> just T -> just T", test => {
                const result = Maybes.or(maybe_1.just(10))(maybe_1.just("tree"));
                test.deepEqual(Array.from(result), ["tree"]);
                test.end();
            });
            test.test("or :: just U -> nothing -> just U", test => {
                const result = Maybes.or(maybe_1.just(10))(maybe_1.nothing());
                test.deepEqual(Array.from(result), [10]);
                test.end();
            });
            test.test("or :: nothing -> nothing -> nothing", test => {
                const result = Maybes.or(maybe_1.nothing())(maybe_1.nothing());
                test.deepEqual(Array.from(result), []);
                test.end();
            });
            test.end();
        });
        test.test("defaultIfEmpty :: U -> Maybe T -> (T | U)", test => {
            test.test("defaultIfEmpty :: U -> just T -> T", test => {
                const result = Maybes.defaultIfEmpty("error")(maybe_1.just(10));
                test.equals(result, 10);
                test.end();
            });
            test.test("defaultIfEmpty :: U -> nothing -> U", test => {
                const result = Maybes.defaultIfEmpty("result")(maybe_1.nothing());
                test.equals(result, "result");
                test.end();
            });
            test.end();
        });
        test.test("isEmpty :: Maybe T -> Boolean", test => {
            test.test("isEmpty :: just T -> true", test => {
                const result = Maybes.isEmpty(maybe_1.just(10));
                test.true(result);
                test.end();
            });
            test.test("isEmpty :: nothing -> true", test => {
                const result = Maybes.isEmpty(maybe_1.nothing());
                test.false(result);
                test.end();
            });
            test.end();
        });
        test.end();
    });
    test.end();
});
//# sourceMappingURL=operators.spec.js.map