import * as Strings from "./generators";
import * as test from "tap";

test.test("string/operators", test => {
	test.test("join :: String -> Iterable String -> Iterable Empty", test => {
		test.test("join :: String -> Empty Iterable -> Empty String", test => {
			test.equals(Strings.join("")([]), "");
			test.equals(Strings.join("|")([]), "");
			test.end();
		});
		test.test("join :: String -> Iterable String -> String", test => {
			test.equals(Strings.join("")(["a", "b", "123", "abBa", "dabba"]), "ab123abBadabba");
			test.equals(Strings.join("||")(["a", "b", "123", "abBa", "dabba"]), "a||b||123||abBa||dabba");
			test.end();
		});
		test.end();
	});
	test.end();
});
