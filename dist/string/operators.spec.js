"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Strings = require("./operators");
const test = require("tap");
test.test("string/operators", test => {
    test.test("flip :: String -> String", test => {
        test.test("flip :: Empty -> Empty", test => {
            test.equals(Strings.flip(""), "");
            test.end();
        });
        test.test("flip :: String -> String", test => {
            test.equals(Strings.flip("abcde"), "edcba");
            test.equals(Strings.flip("Hello World"), "dlroW olleH");
            test.equals(Strings.flip("l0r3m ips\\/m"), "m/\\spi m3r0l");
            test.end();
        });
        test.end();
    });
    test.test("substr :: (StartIndex, Count) -> String -> String", test => {
        test.equals(Strings.substr(0, 10)("abcdefghijklmnopqrstuvwxyz"), "abcdefghij");
        test.equals(Strings.substr(0, 30)("abcdefghijklmnopqrstuvwxyz"), "abcdefghijklmnopqrstuvwxyz");
        test.equals(Strings.substr(10, 10)("abcdefghijklmnopqrstuvwxyz"), "klmnopqrst");
        test.equals(Strings.substr(30, 10)("abcdefghijklmnopqrstuvwxyz"), "");
        test.end();
    });
    test.test("charAt :: (Index) -> String -> String", test => {
        test.equals(Strings.charAt(0)("abcdefghijklmnopqrstuvwxyz"), "a");
        test.equals(Strings.charAt(5)("abcdefghijklmnopqrstuvwxyz"), "f");
        test.equals(Strings.charAt(30)("abcdefghijklmnopqrstuvwxyz"), undefined);
        test.end();
    });
    test.test("replace :: (String, String) -> String -> String", test => {
        test.equals(Strings.replace("abc", "def")("helloabcworldabctree"), "hellodefworlddeftree");
        test.equals(Strings.replace("abc", "def")("helloworld"), "helloworld");
        test.end();
    });
    test.test("replace :: (RegExp, String) -> String -> String", test => {
        test.equals(Strings.replace(/abc/g, "def")("helloabcworldabctree"), "hellodefworlddeftree");
        test.equals(Strings.replace(/abc/g, "def")("helloworld"), "helloworld");
        test.end();
    });
    test.end();
});
//# sourceMappingURL=operators.spec.js.map