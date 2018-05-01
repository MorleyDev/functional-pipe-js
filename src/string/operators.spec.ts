import * as Strings from "./operators";
import * as test from "tap";

test.test("string/operators", test => {
	test.test("flip :: String -> String", test => {
		test.test("flip :: Empty -> Empty", test => {
			test.equals(Strings.flip(""), "");
			test.end();
		});
		test.test("flip :: String -> String", test => {
			test.equals(Strings.flip("abcde"), "edcba");
			test.equals(Strings.flip("Hello World"), "dlroW olleH");
			test.equals(Strings.flip("l0r3m ips\\/m"), "m/\\spi m3r0l");
			test.end();
		});
		test.end();
	});
	test.end();
});
