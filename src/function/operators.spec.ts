import * as Operators from "./operators";
import * as test from "tap";

test.test("function/operators", test => {
	test.test("not :: ((...T) -> Boolean) -> (...T) -> Boolean", test => {
		test.test("not :: ((...T) -> True) -> (..T) -> False", test => {
			test.false(Operators.not((x: number) => x === 20)(20));
			test.false(Operators.not((x: number, y: number, z: string) => x === 20 && y === 35 && z === "60")(20, 35, "60"));
			test.end();
		});
		test.test("not :: ((...T) -> False) -> (..T) -> True", test => {
			test.true(Operators.not((x: number) => x === 20)(35));
			test.true(Operators.not((x: number, y: number, z: string) => x === 20 && y === 35 && z === "60")(26, 35, "60"));
			test.true(Operators.not((x: number, y: number, z: string) => x === 20 && y === 35 && z === "60")(20, 97, "60"));
			test.true(Operators.not((x: number, y: number, z: string) => x === 20 && y === 35 && z === "60")(20, 35, "120"));
			test.end();
		});
		test.end();
	});
	test.test("identity :: T -> T", test => {
		test.equals(Operators.identity(10), 10);

		const ref = {};
		test.equals(Operators.identity(ref), ref);

		test.end();
	});

	test.test("val :: T -> _ -> T", test => {
		test.equals(Operators.val(10)(), 10);
		test.equals(Operators.val(120)(), 120);
		test.equals(Operators.val(120)(5, 8, 2, 1, 0, "tree", "age", 41, 2.5), 120);
		test.end();
	});

	test.test("or :: (...(...T) -> Boolean) -> (...T) -> Boolean", test => {
		test.test("or :: (...(...T) -> Boolean) -> (...T) -> True", test => {
			test.true(Operators.or((x: number) => x === 20, (x: number) => x === 25, (x: number) => x === 30)(20));
			test.true(Operators.or((x: number) => x === 20, (x: number) => x === 25, (x: number) => x === 30)(25));
			test.true(Operators.or((x: number) => x === 20, (x: number) => x === 25, (x: number) => x === 30)(30));
			test.true(Operators.or((x: number, y: number) => x === 20 && y == 25, (x: number, y: number) => x === 25 && y === 30, (x: number, y: number) => x === 30 && y == 50)(20, 25));
			test.true(Operators.or((x: string, y: number) => x === "22" && y == 25, (x: string, y: number) => x === "a" && y === 37, (x: string, y: number) => x === "37" && y == 50)("a", 37));
			test.end();
		});
		test.test("or :: (...(...T) -> Boolean) -> (...T) -> False", test => {
			test.false(Operators.or((x: number) => x === 20, (x: number) => x === 25, (x: number) => x === 30)(120));
			test.false(Operators.or((x: number) => x === 20, (x: number) => x === 25, (x: number) => x === 30)(125));
			test.false(Operators.or((x: number) => x === 20, (x: number) => x === 25, (x: number) => x === 30)(130));
			test.false(Operators.or((x: number, y: number) => x === 20 && y == 25, (x: number, y: number) => x === 25 && y === 30, (x: number, y: number) => x === 30 && y == 50)(120, 25));
			test.false(Operators.or((x: number, y: number) => x === 22 && y == 25, (x: number, y: number) => x === 25 && y === 37, (x: number, y: number) => x === 37 && y == 50)(20, 125));
			test.end();
		});
		test.end();
	});

	test.test("xor :: (...(...T) -> Boolean) -> (...T) -> Boolean", test => {
		test.test("xor :: (...(...T) -> Boolean) -> (...T) -> True", test => {
			test.true(Operators.xor((x: number) => x === 20, (x: number) => x === 25, (x: number) => x === 30)(20));
			test.true(Operators.xor((x: number) => x === 20, (x: number) => x === 25, (x: number) => x === 30)(25));
			test.true(Operators.xor((x: number) => x === 20, (x: number) => x === 25, (x: number) => x === 30)(30));
			test.true(Operators.xor((x: number, y: number) => x === 20 && y == 25, (x: number, y: number) => x === 25 && y === 30, (x: number, y: number) => x === 30 && y == 50)(20, 25));
			test.true(Operators.xor((x: string, y: number) => x === "22" && y == 25, (x: string, y: number) => x === "a" && y === 37, (x: string, y: number) => x === "37" && y == 50)("a", 37));
			test.end();
		});
		test.test("xor :: (...(...T) -> Boolean) -> (...T) -> False", test => {
			test.false(Operators.xor((x: number) => x === 20, (x: number) => x === 25, (x: number) => x === 30)(120));
			test.false(Operators.xor((x: number) => x === 30, (x: number) => x === 25, (x: number) => x === 30)(30));
			test.false(Operators.xor((x: number, y: number) => x === 120 && y == 25, (x: number, y: number) => x === 25 && y === 30, (x: number, y: number) => x === 120 && y == 25)(120, 25));
			test.false(Operators.xor((x: number, y: number) => x === 22 && y == 25, (x: number, y: number) => x === 25 && y === 37, (x: number, y: number) => x === 37 && y == 50)(20, 125));
			test.end();
		});
		test.end();
	});

	test.test("and :: (...(...T) -> Boolean) -> (...T) -> Boolean", test => {
		test.test("and :: (...(...T) -> Boolean) -> (...T) -> True", test => {
			test.true(Operators.and((x: number) => x === 20, (x: number) => x < 25, (x: number) => x < 30)(20));
			test.true(Operators.and((x: number) => x > 20, (x: number) => x === 25, (x: number) => x < 30)(25));
			test.true(Operators.and((x: number) => x >= 20, (x: number) => x >= 25, (x: number) => x === 30)(30));
			test.true(Operators.and((x: number, y: number) => x === 20 && y == 25, (x: number, y: number) => x > 15 && y < 30, (x: number, y: number) => x < 30 && y < 50)(20, 25));
			test.end();
		});
		test.test("and :: (...(...T) -> Boolean) -> (...T) -> False", test => {
			test.false(Operators.and((x: number) => x === 15, (x: number) => x < 25, (x: number) => x < 30)(20));
			test.false(Operators.and((x: number) => x === 25, (x: number) => x === 15, (x: number) => x < 30)(25));
			test.false(Operators.and((x: number) => x < 31, (x: number) => x >= 25, (x: number) => x === 19)(26));
			test.false(Operators.and((x: number, y: number) => x === 20 && y == 25, (x: number, y: number) => x > 15 && y < 30, (x: number, y: number) => x < 30 && y > 50)(20, 25));
			test.end();
		});
		test.end();
	});
	test.end();
});
