import * as Generators from "./generators";
import * as test from "tap";

test.test("async-iterable/generators", test => {
	test.test("from :: Iterable T -> AsyncIterable T", async test => {
		const input = [1, 2, 4, 5];
		const output = Generators.from(input);
		const result: number[] = [];
		for await (const item of output) {
			result.push(item);
		}
		test.deepEquals(result, [1, 2, 4, 5]);
		test.end();
	});

	test.test("defer :: (() -> AsyncIterable T) -> AsyncIterable T", async test => {
		let executed = 0;
		const output = Generators.defer(() => {
			executed = executed + 1;
			return Generators.from([1, 2, 3]);
		});
		test.equals(executed, 0);

		let result: number[] = [];
		for await (const item of output) { result.push(item); }
		test.equals(executed, 1);
		test.deepEquals(result, [1, 2, 3]);

		result = [];
		for await (const item of output) { result.push(item); }
		test.equals(executed, 2);
		test.deepEquals(result, [1, 2, 3]);

		test.end();
	})
	test.end();
});
