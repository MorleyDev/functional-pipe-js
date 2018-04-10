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