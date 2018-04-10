import { just, nothing } from "./maybe";

import { test } from "tap";

test("Maybe T :: just T | nothing", test => {
	test.test("just :: T -> Maybe T", test => {
		const maybe = just(10);
		let result: number | null = null;
		for(const value of maybe) {
			result = value;
		}
		test.equals(result, 10);
		test.end();
	});
	test.test("just :: T -> Maybe T, multiple iterations test", test => {
		const maybe = just(10);
		let result: number | null = null;
		for(const value of maybe) { }
		for(const value of maybe) { }
		for(const value of maybe) {
			result = value;
		}

		test.equals(result, 10);
		test.end();
	});
	test.test("nothing :: () -> Maybe T", test => {
		const maybe = nothing();
		for(const value of maybe) {
			test.fail("Should not be able to iterate a nothing maybe");
		}
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
