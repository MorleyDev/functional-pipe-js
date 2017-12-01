import { $$ } from "./pipe";
import { test } from "tap";

test("pipe", test => {
	const result = $$(10)
		.$(x => x * 2)
		.$(x => x.toString())
		.$(x => x.charAt(0) + "5")
		.$$(parseFloat);

	test.equal(result, 25);
	test.end();
});
