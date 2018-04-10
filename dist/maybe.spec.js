"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = require("./maybe");
const tap_1 = require("tap");
tap_1.test("Maybe T :: just T | nothing", test => {
    test.test("just :: T -> Maybe T", test => {
        const maybe = maybe_1.just(10);
        let result = null;
        for (const value of maybe) {
            result = value;
        }
        test.equals(result, 10);
        test.end();
    });
    test.test("just :: T -> Maybe T, multiple iterations test", test => {
        const maybe = maybe_1.just(10);
        let result = null;
        for (const value of maybe) { }
        for (const value of maybe) { }
        for (const value of maybe) {
            result = value;
        }
        test.equals(result, 10);
        test.end();
    });
    test.test("nothing :: () -> Maybe T", test => {
        const maybe = maybe_1.nothing();
        for (const value of maybe) {
            test.fail("Should not be able to iterate a nothing maybe");
        }
        test.end();
    });
    test.test("defer :: (() -> Maybe T) -> Maybe T", test => {
        test.test("defer :: (() -> just T) -> just T", test => {
            let invoked = false;
            const maybe = maybe_1.defer(() => { invoked = true; return maybe_1.just(20); });
            test.false(invoked);
            test.deepEqual(Array.from(maybe), [20]);
            test.true(invoked);
            test.end();
        });
        test.test("defer :: (() -> nothing) -> nothing", test => {
            let invoked = false;
            const maybe = maybe_1.defer(() => { invoked = true; return maybe_1.nothing(); });
            test.false(invoked);
            test.deepEqual(Array.from(maybe), []);
            test.true(invoked);
            test.end();
        });
        test.end();
    });
    test.test("infer :: (T | null | undefined) -> Maybe T", test => {
        test.test("infer :: T -> just T", test => {
            const maybe = maybe_1.infer(10);
            test.deepEqual(Array.from(maybe), [10]);
            test.end();
        });
        test.test("infer :: null -> nothing", test => {
            const maybe = maybe_1.infer(null);
            test.deepEqual(Array.from(maybe), []);
            test.end();
        });
        test.test("infer :: undefined -> nothing", test => {
            const maybe = maybe_1.infer(undefined);
            test.deepEqual(Array.from(maybe), []);
            test.end();
        });
        test.end();
    });
    test.test("Array.from(just T) -> Array<T>", test => {
        const maybe = maybe_1.just(10);
        const result = Array.from(maybe);
        test.deepEquals(result, [10]);
        test.end();
    });
    test.test("Array.from(nothing) -> Array>", test => {
        const maybe = maybe_1.nothing();
        const result = Array.from(maybe);
        test.deepEquals(result, []);
        test.end();
    });
    test.end();
});
//# sourceMappingURL=maybe.spec.js.map