import * as Operators from "./operators";
import * as test from "tap";

import { $$ } from "../pipe";

test.test("promise/operators", test => {
	test.test("then :: (T -> U) -> T -> Promise U", async test => {
		const result = await $$(10).$$(Operators.then(x => x * 20));
		test.equals(result, 200);
		test.end();
	});
	test.test("then :: (T -> U) -> Promise T -> Promise U", async test => {
		const result = await $$(Promise.resolve(10)).$$(Operators.then(x => x * 20));
		test.equals(result, 200);
		test.end();
	});
	test.test("then :: (T -> Promise U) -> T -> Promise U", async test => {
		const result = await $$(10).$$(Operators.then(x => Promise.resolve(x * 20)));
		test.equals(result, 200);
		test.end();
	});
	test.test("then :: (T -> Promise U) -> Promise T -> Promise U", async test => {
		const result = await $$(Promise.resolve(10)).$$(Operators.then(x => Promise.resolve(x * 20)));
		test.equals(result, 200);
		test.end();
	});


	test.test("catchError :: (Error -> U) -> T -> Promise T", async test => {
		const result = await $$(10).$$(Operators.catchError(x => 100));
		test.equals(result, 10);
		test.end();
	});
	test.test("catchError :: (Error -> U) -> Promise T -> Promise T", async test => {
		const result = await $$(Promise.resolve(10)).$$(Operators.catchError(x => 100));
		test.equals(result, 10);
		test.end();
	});
	test.test("catchError :: (Error -> Promise U) -> T -> Promise T", async test => {
		const result = await $$(10).$$(Operators.catchError(x => Promise.resolve(100)));
		test.equals(result, 10);
		test.end();
	});
	test.test("catchError :: (Error -> Promise U) -> Promise T -> Promise T", async test => {
		const result = await $$(Promise.resolve(10)).$$(Operators.catchError(x => Promise.resolve(100)));
		test.equals(result, 10);
		test.end();
	});
	test.test("catchError :: (Error -> U) -> Error -> Promise U", async test => {
		const result = await $$(Promise.reject(10)).$$(Operators.catchError(x => `${x}:${100}`));
		test.equals(result, "10:100");
		test.end();
	});
	test.test("catchError :: (Error -> Promise U) -> Error -> Promise U", async test => {
		const result = await $$(Promise.reject(10)).$$(Operators.catchError(x => Promise.resolve(`${x}:${100}`)));
		test.equals(result, "10:100");
		test.end();
	});

	test.test("match :: (Patterns T U) T -> -> U", async test => {
		test.equals(await Operators.match([() => true, x => x.toString()])(10), "10");
		test.equals(await Operators.match([() => true, x => x.toString()])(Promise.resolve(10)), "10");
		test.equals(await Operators.match([() => true, "10"])(10), "10");
		test.equals(await Operators.match([() => true, async x => x.toString()])(10), "10");
		test.equals(await Operators.match([() => Promise.resolve<true>(true), "10"])(10), "10");
		test.equals(await Operators.match([(x) => false, 25], [(x) => Promise.resolve<true>(true), "10"])(Promise.resolve(10)), "10");
		test.equals(await Operators.match(
			[11, "26"],
			[10, "25"],
			[12, "55"],
			[() => true, ""]
		)(10), "25");
		test.equals(await Operators.match(
			[async x => x !== 10, "26"],
			[async x => x === 10, "25"],
			[12, "55"],
			[() => true, ""]
		)(10), "25");
		test.equals(await Operators.match(
			[x => x !== 10, "26"],
			[x => x === 10, "25"],
			[12, "55"],
			[() => true, ""]
		)(10), "25");
		test.equals(await Operators.match(
			[x => x !== 10, "26"],
			[x => x === 10, x => (x + 15).toString()],
			[12, "55"],
			[() => true, () => ""]
		)(10), "25");
		test.equals(await Operators.match(
			[async x => x !== 10, "26"],
			[async x => x === 10, async x => (x + 15).toString()],
			[12, "55"],
			[() => true, async () => ""]
		)(10), "25");
		test.equals(await Operators.match(
			[10, "25"],
			[() => true, ""]
		)(10), "25");
		test.end();
	});

	test.end();
});
