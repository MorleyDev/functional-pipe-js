import * as tap from "tap";

import { catchError, then } from "./operators";

import { $$ } from "../pipe";

tap.test("promise/operators", test => {
	test.test("then :: (T -> U) -> T -> Promise U", async test => {
		const result = await $$(10).$$(then(x => x * 20));
		test.equals(result, 200);
		test.end();
	});
	test.test("then :: (T -> U) -> Promise T -> Promise U", async test => {
		const result = await $$(Promise.resolve(10)).$$(then(x => x * 20));
		test.equals(result, 200);
		test.end();
	});
	test.test("then :: (T -> Promise U) -> T -> Promise U", async test => {
		const result = await $$(10).$$(then(x => Promise.resolve(x * 20)));
		test.equals(result, 200);
		test.end();
	});
	test.test("then :: (T -> Promise U) -> Promise T -> Promise U", async test => {
		const result = await $$(Promise.resolve(10)).$$(then(x => Promise.resolve(x * 20)));
		test.equals(result, 200);
		test.end();
	});

	
	test.test("catchError :: (Error -> U) -> T -> Promise T", async test => {
		const result = await $$(10).$$(catchError(x => 100));
		test.equals(result, 10);
		test.end();
	});
	test.test("catchError :: (Error -> U) -> Promise T -> Promise T", async test => {
		const result = await $$(Promise.resolve(10)).$$(catchError(x => 100));
		test.equals(result, 10);
		test.end();
	});
	test.test("catchError :: (Error -> Promise U) -> T -> Promise T", async test => {
		const result = await $$(10).$$(catchError(x => Promise.resolve(100)));
		test.equals(result, 10);
		test.end();
	});
	test.test("catchError :: (Error -> Promise U) -> Promise T -> Promise T", async test => {
		const result = await $$(Promise.resolve(10)).$$(catchError(x => Promise.resolve(100)));
		test.equals(result, 10);
		test.end();
	});
	test.test("catchError :: (Error -> U) -> Error -> Promise U", async test => {
		const result = await $$(Promise.reject(10)).$$(catchError(x => `${x}:${100}`));
		test.equals(result, "10:100");
		test.end();
	});
	test.test("catchError :: (Error -> Promise U) -> Error -> Promise U", async test => {
		const result = await $$(Promise.reject(10)).$$(catchError(x => Promise.resolve(`${x}:${100}`)));
		test.equals(result, "10:100");
		test.end();
	});

	test.end();
});
