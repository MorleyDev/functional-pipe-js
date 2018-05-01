"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Strings = require("./generators");
const test = require("tap");
test.test("string/operators", test => {
    test.test("join :: String -> Iterable String -> Iterable Empty", test => {
        test.test("join :: String -> Empty Iterable -> Empty String", test => {
            test.equals(Strings.join("")([]), "");
            test.equals(Strings.join("|")([]), "");
            test.end();
        });
        test.test("join :: String -> Iterable String -> String", test => {
            test.equals(Strings.join("")(["a", "b", "123", "abBa", "dabba"]), "ab123abBadabba");
            test.equals(Strings.join("||")(["a", "b", "123", "abBa", "dabba"]), "a||b||123||abBa||dabba");
            test.end();
        });
        test.test("concat :: (...String) -> String", test => {
            test.equals(Strings.concat("a", "b", "123", "abBa", "dabba"), "ab123abBadabba");
            test.end();
        });
        test.end();
    });
    test.end();
});
//# sourceMappingURL=generators.spec.js.map