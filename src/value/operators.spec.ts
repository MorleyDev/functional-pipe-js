import * as Operators from "./operators";
import * as test from "tap";

test.test("value/operators", test => {
	test.test("match :: (Patterns T U) -> T -> U", test => {
		test.equals(Operators.match([() => true, x => x.toString()])(10), "10");
		test.equals(Operators.match([() => true, "10"])(10), "10");
		test.equals(Operators.match([(_) => false, 25], [(_) => true, "10"])(10), "10");
		test.equals(Operators.match(
			[11, "26"],
			[10, "25"],
			[12, "55"],
			[() => true, ""]
		)(10), "25");
		test.equals(Operators.match(
			[x => x !== 10, "26"],
			[x => x === 10, "25"],
			[12, "55"],
			[() => true, ""]
		)(10), "25");
		test.equals(Operators.match(
			[x => x !== 10, "26"],
			[x => x === 10, x => (x + 15).toString()],
			[12, "55"],
			[() => true, () => ""]
		)(10), "25");
		test.equals(Operators.match(
			[10, "25"],
			[() => true, ""]
		)(10), "25");
		test.end();
	});

	test.test("maybeMatch :: (Patterns T U) -> T -> Maybe U", test => {
		test.deepEquals(Array.from(Operators.maybeMatch([(x: number) => true, x => x.toString()])(10)), ["10"]);
		test.deepEquals(Array.from(Operators.maybeMatch([(x: number) => true, "10"])(10)), ["10"]);
		test.deepEquals(Array.from(Operators.maybeMatch<number, number | string>([(_) => false, 25], [(_) => true, "10"])(10)), ["10"]);
		test.deepEquals(Array.from(Operators.maybeMatch(
			[11, "26"],
			[10, "25"],
			[12, "55"]
		)(10)), ["25"]);
		test.deepEquals(Array.from(Operators.maybeMatch(
			[x => x !== 10, "26"],
			[x => x === 10, "25"],
			[12, "55"]
		)(10)), ["25"]);
		test.deepEquals(Array.from(Operators.maybeMatch(
			[x => x !== 10, "26"],
			[x => x === 10, x => (x + 15).toString()],
			[12, "55"]
		)(10)), ["25"]);
		test.deepEquals(Array.from(Operators.maybeMatch(
			[10, "25"]
		)(10)), ["25"]);
		test.deepEquals(Array.from(Operators.maybeMatch(
			[11, "25"]
		)(10)), []);
		test.deepEquals(Array.from(Operators.maybeMatch(
			[11, "25"],
			[12, "25"],
			[13, "25"]
		)(10)), []);
		test.end();
	});
	test.end();
});
