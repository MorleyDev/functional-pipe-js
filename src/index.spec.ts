import * as test from "tap";

import { $$, Generators, Iterables, Maybe, Maybes, Promises } from "./index";

import { toArray } from "./iterable/operators";

test.test("index", test => {
	const result = $$("abcdefghijklmnopqrstuvwxyz")
		.$(alphabet => Array.from(alphabet))
		.$(Iterables.map(letter => letter.toUpperCase()))
		.$(Maybe.last)
		.$(Maybes.map(letter => `${letter}abcdefghijklmnopqrstuvwxy`))
		.$(Iterables.flatMap(str => Array.from(str)))
		.$(Iterables.flip)
		.$(toArray)
		.$$(arr => arr.join(""));

	test.equal(result, "yxwvutsrqponmlkjihgfedcbaZ");
	test.end();
});
