"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Operators = require("./operators");
const test = require("tap");
test.test("function/operators", test => {
    test.test("not :: ((...T) -> Boolean) -> (...T) -> Boolean", test => {
        test.test("not :: ((...T) -> True) -> (..T) -> False", test => {
            test.false(Operators.not((x) => x === 20)(20));
            test.false(Operators.not((x, y, z) => x === 20 && y === 35 && z === "60")(20, 35, "60"));
            test.end();
        });
        test.test("not :: ((...T) -> False) -> (..T) -> True", test => {
            test.true(Operators.not((x) => x === 20)(35));
            test.true(Operators.not((x, y, z) => x === 20 && y === 35 && z === "60")(26, 35, "60"));
            test.true(Operators.not((x, y, z) => x === 20 && y === 35 && z === "60")(20, 97, "60"));
            test.true(Operators.not((x, y, z) => x === 20 && y === 35 && z === "60")(20, 35, "120"));
            test.end();
        });
        test.end();
    });
    test.test("unit :: T -> T", test => {
        test.equals(Operators.unit(10), 10);
        const ref = {};
        test.equals(Operators.unit(ref), ref);
        test.end();
    });
    test.end();
});
//# sourceMappingURL=operators.spec.js.map