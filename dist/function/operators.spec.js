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
    test.test("or :: (...(...T) -> Boolean) -> (...T) -> Boolean", test => {
        test.test("or :: (...(...T) -> Boolean) -> (...T) -> True", test => {
            test.true(Operators.or((x) => x === 20, (x) => x === 25, (x) => x === 30)(20));
            test.true(Operators.or((x) => x === 20, (x) => x === 25, (x) => x === 30)(25));
            test.true(Operators.or((x) => x === 20, (x) => x === 25, (x) => x === 30)(30));
            test.true(Operators.or((x, y) => x === 20 && y == 25, (x, y) => x === 25 && y === 30, (x, y) => x === 30 && y == 50)(20, 25));
            test.true(Operators.or((x, y) => x === "22" && y == 25, (x, y) => x === "a" && y === 37, (x, y) => x === "37" && y == 50)("a", 37));
            test.end();
        });
        test.test("or :: (...(...T) -> Boolean) -> (...T) -> False", test => {
            test.false(Operators.or((x) => x === 20, (x) => x === 25, (x) => x === 30)(120));
            test.false(Operators.or((x) => x === 20, (x) => x === 25, (x) => x === 30)(125));
            test.false(Operators.or((x) => x === 20, (x) => x === 25, (x) => x === 30)(130));
            test.false(Operators.or((x, y) => x === 20 && y == 25, (x, y) => x === 25 && y === 30, (x, y) => x === 30 && y == 50)(120, 25));
            test.false(Operators.or((x, y) => x === 22 && y == 25, (x, y) => x === 25 && y === 37, (x, y) => x === 37 && y == 50)(20, 125));
            test.end();
        });
        test.end();
    });
    test.test("and :: (...(...T) -> Boolean) -> (...T) -> Boolean", test => {
        test.test("and :: (...(...T) -> Boolean) -> (...T) -> True", test => {
            test.true(Operators.and((x) => x === 20, (x) => x < 25, (x) => x < 30)(20));
            test.true(Operators.and((x) => x > 20, (x) => x === 25, (x) => x < 30)(25));
            test.true(Operators.and((x) => x >= 20, (x) => x >= 25, (x) => x === 30)(30));
            test.true(Operators.and((x, y) => x === 20 && y == 25, (x, y) => x > 15 && y < 30, (x, y) => x < 30 && y < 50)(20, 25));
            test.end();
        });
        test.test("and :: (...(...T) -> Boolean) -> (...T) -> False", test => {
            test.false(Operators.and((x) => x === 15, (x) => x < 25, (x) => x < 30)(20));
            test.false(Operators.and((x) => x === 25, (x) => x === 15, (x) => x < 30)(25));
            test.false(Operators.and((x) => x < 31, (x) => x >= 25, (x) => x === 19)(26));
            test.false(Operators.and((x, y) => x === 20 && y == 25, (x, y) => x > 15 && y < 30, (x, y) => x < 30 && y > 50)(20, 25));
            test.end();
        });
        test.end();
    });
    test.end();
});
//# sourceMappingURL=operators.spec.js.map