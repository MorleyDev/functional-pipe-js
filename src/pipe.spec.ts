import { $$ } from "./pipe";
import { test } from "tap";

test("pipe/$$", test => {
	const result = $$(10)
		.$(x => x * 4)
		.$((x, y) => (x / y).toString(), 2)
		.$(x => x.charAt(0) + "5")
		.$((x, y, z) => `${z}${x}5${y}`, 10, 50)
		.$$(parseInt, 8);

	test.equal(result, 1321800);
	test.end();
});

