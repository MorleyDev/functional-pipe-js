import * as test from "tap";
import * as Operators from "./operators";

test.test("value/operators", test => {
    test.test("match :: (Patterns T U) -> T -> U", test => {
        test.equals(Operators.match([() => true, x => x.toString()])(10), "10");
        test.equals(Operators.match([() => true, "10"])(10), "10");
        test.equals(Operators.match(
            [11, "26"],
            [10, "25"],
            [12, "55"],
            [() => true, ""]
        )(10), "25");
        test.equals(Operators.match(
            [x => x !== 10, "26"],
            [x => x === 10, "25"],
            [12, "55"],
            [() => true, ""]
        )(10), "25");
        test.equals(Operators.match(
            [x => x !== 10, "26"],
            [x => x === 10, x => (x + 15).toString()],
            [12, "55"],
            [() => true, () => ""]
        )(10), "25");
        test.equals(Operators.match(
            [10, "25"],
            [() => true, ""]
        )(10), "25");
        test.end();
    });
    test.end();
});
