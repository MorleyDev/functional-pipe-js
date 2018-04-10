import * as Generators from "./generators";
import * as test from "tap";

test.test("maybe/generators", test => {
	test.test("find :: (T -> Boolean) -> Iterable T -> Maybe T", test => {
		test.test("find :: (T -> True) -> Iterable T -> just T", test => {
			const found = Generators.find<number>(value => value === 20)([10, 20, 30]);
			test.deepEquals(Array.from(found), [20]);
			test.end();
		});
		test.test("find :: (T -> False) -> Iterable T -> nothing", test => {
			const found = Generators.find<number>(value => false)([10, 20, 30]);
			test.deepEquals(Array.from(found), []);
			test.end();
		});
		test.end();
	});
	test.test("first :: Iterable T -> Maybe T", test => {
		test.test("first :: Iterable T -> just T", test => {
			const found = Generators.first([5, 10, 15]);
			test.deepEquals(Array.from(found), [5]);
			test.end();
		});
		test.test("first :: Iterable _ -> nothing", test => {
			const found = Generators.first([]);
			test.deepEquals(Array.from(found), []);
			test.end();
		});
		test.end();
	});
	test.test("last :: Iterable T -> Maybe T", test => {
		test.test("last :: Iterable T -> just T", test => {
			const found = Generators.last([5, 10, 15]);
			test.deepEquals(Array.from(found), [15]);
			test.end();
		});
		test.test("last :: Iterable _ -> nothing", test => {
			const found = Generators.last([]);
			test.deepEquals(Array.from(found), []);
			test.end();
		});
		test.end();
	});
	test.test("elementAt :: N -> Iterable T -> Maybe T", test => {
		test.test("elementAt :: N -> Iterable T -> just T", test => {
			const found = Generators.elementAt(3)([5, 10, 15, 20, 25, 30]);
			test.deepEquals(Array.from(found), [20]);
			test.end();
		});
		test.test("elementAt :: N -> Iterable T -> nothing", test => {
			const found = Generators.elementAt(13)([5, 10, 15, 20, 25, 30]);
			test.deepEquals(Array.from(found), []);
			test.end();
		});
		test.end();
	});
	test.end();
});
