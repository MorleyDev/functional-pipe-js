import * as Operators from "./operators";

import { test } from "tap";

test("iterable/operators", test => {
	test.test("unit :: Iterable[T] -> Iterable[T]", test => {
		const input = ["a", "b", "c", "f"];
		const output = Array.from(Operators.unit(input));
		test.deepEqual(output, input);
		test.end();
	});
	test.test("tap :: ((T, Number) -> Unit) -> Iterable[T] -> Iterable[T]", test => {
		const input = ["a", "b", "c", "f"];
		const tapped: { value: string; index: number }[] = [];
		const output = Operators.tap((value: string, index: number) => tapped.push({ value, index }))(input);

		test.equal(tapped.length, 0);
		test.deepEqual(Array.from(output), input);
		test.deepEqual(tapped, [{ value: "a", index: 0 }, { value: "b", index: 1 }, { value: "c", index: 2 }, { value: "f", index: 3 }]);
		test.end();
	});
	test.test("map :: ((T, Number) -> U) -> Iterable[T] -> Iterable[U]", test => {
		const result = Operators.map((value: string, index) => ({ value: value + index, index }))(["a", "b", "c"]);
		test.deepEqual(Array.from(result), [{ value: "a0", index: 0 }, { value: "b1", index: 1 }, { value: "c2", index: 2 }]);
		test.end();
	});
	test.test("flatMap :: ((T, Number) -> U) -> Iterable[T] -> Iterable[U]", test => {
		const result = Operators.flatMap((value: string, index) => [index, { value: value + index, index }])(["a", "b", "c"]);
		test.deepEqual(Array.from(result), [0, { value: "a0", index: 0 }, 1, { value: "b1", index: 1 }, 2, { value: "c2", index: 2 }]);
		test.end();
	});
	test.test("filter :: ((T, Number) -> Boolean) -> Iterable[T] -> Iterable[T]", test => {
		const result = Operators.filter((value: string, index) => value.startsWith("a") && index % 2 === 0)(["aa", "ab", "ba", "az", "ae"]);
		test.deepEqual(Array.from(result), ["aa", "ae"]);
		test.end();
	});
	test.test("reduce :: ((U, T, Number) -> (Iterable[T], U) -> U", test => {
		const result = Operators.reduce((prev: number, curr: string, index) => prev + parseInt(curr) + index, 100)(["10", "20", "30"]);
		test.equal(result, 163);
		test.end();
	});
	test.test("scan :: ((U, T, Number) -> (Iterable[T], U) -> Iterable[U]", test => {
		const result = Operators.scan((prev: number, curr: string, index) => prev + parseInt(curr) + index, 100)(["10", "20", "30"]);
		test.deepEqual(Array.from(result), [110, 131, 163]);
		test.end();
	});
	test.test("fold :: ((T, T, Number) -> Iterable[T] -> Iterable[T]", test => {
		const result = Operators.reduce((prev: string, curr: string, index) => (parseInt(prev) + parseInt(curr) + index).toString(), "100")(["10", "20", "30"]);
		test.equal(result, "163");
		test.end();
	});
	test.test("take :: Number -> Iterable[T] -> Iterable[T]", test => {
		test.test("take :: Number 0 -> Iterable[T] -> Empty", test => {
			const result = Operators.take(0)([10, 11, 12, 13]);
			test.equal(Array.from(result).length, 0);
			test.end();
		});
		test.test("take :: Number < Length -> Iterable[T] -> Iterable[T]", test => {
			const result = Operators.take(2)([10, 11, 12, 13]);
			test.deepEqual(Array.from(result), [10, 11]);
			test.end();
		});
		test.test("take :: Number < 0 -> Iterable[T] -> Empty", test => {
			const result = Operators.take(-2)([10, 11, 12, 13]);
			test.deepEqual(Array.from(result).length, 0);
			test.end();
		});
		test.test("take :: Number > Length -> Iterable[T] -> Iterable[T]", test => {
			const result = Operators.take(10)([10, 11, 12, 13]);
			test.deepEqual(Array.from(result), [10, 11, 12, 13]);
			test.end();
		});
		test.end();
	});
	test.test("skip :: Number -> Iterable[T] -> Iterable[T]", test => {
		test.test("skip :: Number 0 -> Iterable[T] -> Iterable[T]", test => {
			const result = Operators.skip(0)([10, 11, 12, 13]);
			test.deepEqual(Array.from(result), [10, 11, 12, 13]);
			test.end();
		});
		test.test("skip :: Number < 0 -> Iterable[T] -> Iterable[T]", test => {
			const result = Operators.skip(-10)([10, 11, 12, 13]);
			test.deepEqual(Array.from(result), [10, 11, 12, 13]);
			test.end();
		});
		test.test("skip :: Number < Length -> Iterable[T] -> Iterable[T]", test => {
			const result = Operators.skip(2)([10, 11, 12, 13]);
			test.deepEqual(Array.from(result), [12, 13]);
			test.end();
		});
		test.test("skip :: Number > Length -> Iterable[T] -> Iterable[T]", test => {
			const result = Operators.skip(20)([10, 11, 12, 13]);
			test.deepEqual(Array.from(result), []);
			test.end();
		});
		test.end();
	});

	test.test("takeWhile :: ((T, Number) -> Boolean) -> Iterable[T] -> Iterable[T]", test => {
		const result = Operators.takeWhile((value: number, index) => value < 15 && index < 3)([10, 13, 15, 12, 18]);
		test.deepEqual(Array.from(result), [10, 13]);
		test.end();
	});
	test.test("takeUntil :: ((T, Number) -> Boolean) -> Iterable[T] -> Iterable[T]", test => {
		const result = Operators.takeUntil((value: number, index) => value > 15 || index > 2)([10, 13, 15, 12, 18]);
		test.deepEqual(Array.from(result), [10, 13, 15]);
		test.end();
	});

	test.test("skipWhile :: ((T, Number) -> Boolean) -> Iterable[T] -> Iterable[T]", test => {
		const result = Operators.skipWhile((value: number, index) => value < 15 && index < 3)([10, 13, 15, 12, 18]);
		test.deepEqual(Array.from(result), [15, 12, 18]);
		test.end();
	});
	test.test("skipUntil :: ((T, Number) -> Boolean) -> Iterable[T] -> Iterable[T]", test => {
		const result = Operators.skipUntil((value: number, index) => value > 15 || index > 2)([10, 13, 15, 12, 18]);
		test.deepEqual(Array.from(result), [12, 18]);
		test.end();
	});

	test.test("concat :: (...Iterable[T]) -> Iterable[T] -> Iterable[T]", test => {
		const result = Operators.concat([1, 2, 3], [], [5, 6, 7])([0, -1, -2]);
		test.deepEqual(Array.from(result), [0, -1, -2, 1, 2, 3, 5, 6, 7]);
		test.end();
	});
	test.test("push :: (...T) -> Iterable[T] -> Iterable[T]", test => {
		const result = Operators.push(1, 2, 3, 4, 5)([10, 11, 12]);
		test.deepEqual(Array.from(result), [10, 11, 12, 1, 2, 3, 4, 5]);
		test.end();
	});
	test.test("unshift :: (...T) -> Iterable[T] -> Iterable[T]", test => {
		const result = Operators.unshift(1, 2, 3, 4, 5)([10, 11, 12]);
		test.deepEqual(Array.from(result), [5, 4, 3, 2, 1, 10, 11, 12]);
		test.end();
	});
	test.test("some :: ((T, Number) -> Boolean) -> Iterable[T] -> Boolean", test => {
		const trueResult = Operators.some((x: number, i) => x + i === 10)([1, 9, 3, 2]);
		const falseResult = Operators.some((x: number, i) => x + i === 10)([1, 8, 3, 2]);
		test.true(trueResult);
		test.false(falseResult);
		test.end();
	});
	test.test("every :: ((T, Number) -> Boolean) -> Iterable[T] -> Boolean", test => {
		const trueResult = Operators.every((x: number, i) => x + i !== 10)([1, 8, 3, 2]);
		const falseResult1 = Operators.every((x: number, i) => x + i === 10)([1, 9, 3, 2]);
		const falseResult2 = Operators.every((x: number, i) => x + i !== 10)([1, 9, 3, 2]);
		test.true(trueResult);
		test.false(falseResult1);
		test.false(falseResult2);
		test.end();
	});

	test.end();
});