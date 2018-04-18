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
	test.end();
});
