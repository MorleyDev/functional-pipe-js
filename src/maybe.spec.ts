import { defer, infer, just, nothing } from "./maybe";

import { test } from "tap";

test("Maybe T :: just T | nothing", test => {
	test.test("just :: T -> Maybe T", test => {
		const maybe = just(10);
		let result: number | null = null;
		for (const value of maybe) {
			result = value;
		}
		test.equals(result, 10);
		test.end();
	});
	test.test("just :: T -> Maybe T, multiple iterations test", test => {
		const maybe = just(10);
		let result: number | null = null;
		for (const value of maybe) { }
		for (const value of maybe) { }
		for (const value of maybe) {
			result = value;
		}

		test.equals(result, 10);
		test.end();
	});
	test.test("nothing :: () -> Maybe T", test => {
		const maybe = nothing();
		for (const value of maybe) {
			test.fail("Should not be able to iterate a nothing maybe");
		}
		test.end();
	});

	test.test("defer :: (() -> Maybe T) -> Maybe T", test => {
		test.test("defer :: (() -> just T) -> just T", test => {
			let invoked = false;
			const maybe = defer(() => { invoked = true; return just(20); });
			test.false(invoked);
			test.deepEqual(Array.from(maybe), [20]);
			test.true(invoked);
			test.end();
		});
		test.test("defer :: (() -> nothing) -> nothing", test => {
			let invoked = false;
			const maybe = defer(() => { invoked = true; return nothing(); });
			test.false(invoked);
			test.deepEqual(Array.from(maybe), []);
			test.true(invoked);
			test.end();
		});
		test.end();
	});

	test.test("infer :: (T | null | undefined) -> Maybe T", test => {
		test.test("infer :: T -> just T", test => {
			const maybe = infer(10);
			test.deepEqual(Array.from(maybe), [10]);
			test.end();
		});
		test.test("infer :: null -> nothing", test => {
			const maybe = infer(null);
			test.deepEqual(Array.from(maybe), []);
			test.end();
		});
		test.test("infer :: undefined -> nothing", test => {
			const maybe = infer(undefined);
			test.deepEqual(Array.from(maybe), []);
			test.end();
		});
		test.end();
	});

	test.test("Array.from(just T) -> Array<T>", test => {
		const maybe = just(10);
		const result = Array.from(maybe);
		test.deepEquals(result, [10]);
		test.end();
	});
	test.test("Array.from(nothing) -> Array>", test => {
		const maybe = nothing();
		const result = Array.from(maybe);
		test.deepEquals(result, []);
		test.end();
	});
	test.end();
});
