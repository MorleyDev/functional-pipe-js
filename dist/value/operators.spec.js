"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Operators = require("./operators");
const test = require("tap");
test.test("value/operators", test => {
    test.test("match :: (Patterns T U) -> T -> U", test => {
        test.equals(Operators.match([() => true, x => x.toString()])(10), "10");
        test.equals(Operators.match([() => true, "10"])(10), "10");
        test.equals(Operators.match([(_) => false, 25], [(_) => true, "10"])(10), "10");
        test.equals(Operators.match([11, "26"], [10, "25"], [12, "55"], [() => true, ""])(10), "25");
        test.equals(Operators.match([x => x !== 10, "26"], [x => x === 10, "25"], [12, "55"], [() => true, ""])(10), "25");
        test.equals(Operators.match([x => x !== 10, "26"], [x => x === 10, x => (x + 15).toString()], [12, "55"], [() => true, () => ""])(10), "25");
        test.equals(Operators.match([10, "25"], [() => true, ""])(10), "25");
        test.end();
    });
    test.end();
});
//# sourceMappingURL=operators.spec.js.map