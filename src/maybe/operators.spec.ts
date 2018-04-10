import * as Maybes from "./operators";

import { just, nothing } from "../maybe";

import { match } from "./operators";
import { test } from "tap";

test("maybe/operators", test => {
	test.test("map :: (T - > U) -> Maybe T -> Maybe U", test => {
		test.test("match :: { just: T -> U, nothing: () -> U } -> Maybe T -> U", test => {
			test.test("match :: { just: T -> U, nothing: () -> U } -> just T -> U", test => {
				const result = match({
					just: (value: number) => `${value * 2.5}`,
					nothing: () => "error"
				})(just(10));
				test.equals(result, "25");
				test.end();
			});
			test.test("match :: { just: T -> U, nothing: () -> U } -> nothing -> U", test => {
				const result = match({
					just: (value: number) => "error",
					nothing: () => "success"
				})(nothing());
				test.equals(result, "success");
				test.end();
			});
			test.end();
		});

		test.test("map :: (T -> U) -> just T -> just U", test => {
			const result = Maybes.map((x: number) => `${x * 1.5}`)(just(15));
			test.deepEqual(Array.from(result), ["22.5"]);
			test.end();
		});
		test.test("map :: (T -> U) -> nothing -> nothing", test => {
			const result = Maybes.map((x: number) => `${x * 1.5}`)(nothing());
			test.deepEqual(Array.from(result), []);
			test.end();
		});

		test.test("flatMap :: (T -> Maybe U) -> Maybe T -> Maybe U", test => {
			test.test("flatMap :: (T -> just U) -> just T -> just U", test => {
				const result = Maybes.flatMap((value: number) => just(value + 5))(just(10));
				test.deepEqual(Array.from(result), [15]);
				test.end();
			});
			test.test("flatMap :: (T -> nothing) -> just T -> nothing", test => {
				const result = Maybes.flatMap((value: number) => nothing())(just(10));
				test.deepEqual(Array.from(result), []);
				test.end();
			});
			test.test("flatMap :: (T -> just U) -> nothing -> nothing", test => {
				const result = Maybes.flatMap((value: number) => just(value + 5))(nothing());
				test.deepEqual(Array.from(result), []);
				test.end();
			});
			test.end();
		});

		test.test("filter :: (T -> Boolean) -> Maybe T -> Maybe T", test => {
			test.test("filter :: (T -> true) -> just T -> just T", test => {
				const result = Maybes.filter((value: string) => value === "testVal")(just("testVal"));
				test.deepEquals(Array.from(result), ["testVal"]);
				test.end();
			});
			test.test("filter :: (T -> false) -> just T -> nothing", test => {
				const result = Maybes.filter((value: string) => value !== "testVal")(just("testVal"));
				test.deepEquals(Array.from(result), []);
				test.end();
			});
			test.test("filter :: (T -> boolean) -> nothing -> nothing", test => {
				const result = Maybes.filter((value: string) => true)(nothing());
				test.deepEquals(Array.from(result), []);
				test.end();
			});
			test.end();
		});

		test.test("or :: Maybe U -> Maybe T -> Maybe (T | U)", test => {
			test.test("or :: just U -> just T -> just T", test => {
				const result = Maybes.or(just(10))(just("tree"));
				test.deepEqual(Array.from(result), ["tree"]);
				test.end();
			});
			test.test("or :: just U -> nothing -> just U", test => {
				const result = Maybes.or(just(10))(nothing());
				test.deepEqual(Array.from(result), [10]);
				test.end();
			});
			test.test("or :: nothing -> nothing -> nothing", test => {
				const result = Maybes.or(nothing())(nothing());
				test.deepEqual(Array.from(result), []);
				test.end();
			});
			test.end();
		});

		test.test("defaultIfEmpty :: U -> Maybe T -> (T | U)", test => {
			test.test("defaultIfEmpty :: U -> just T -> T", test => {
				const result = Maybes.defaultIfEmpty("error")(just(10));
				test.equals(result, 10);
				test.end();
			});
			test.test("defaultIfEmpty :: U -> nothing -> U", test => {
				const result = Maybes.defaultIfEmpty("result")(nothing());
				test.equals(result, "result");
				test.end();
			});
			test.end();
		});

		test.test("isEmpty :: Maybe T -> Boolean", test => {
			test.test("isEmpty :: just T -> true", test => {
				const result = Maybes.isEmpty(just(10));
				test.true(result);
				test.end();
			});
			test.test("isEmpty :: nothing -> true", test => {
				const result = Maybes.isEmpty(nothing());
				test.false(result);
				test.end();
			});
			test.end();
		});

		test.end();
	})
	test.end();
});
