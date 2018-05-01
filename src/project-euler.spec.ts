import * as test from "tap";
import { $$ } from "./pipe";
import { range, infinite } from "./iterable/generators";
import { filter, fold, scan, map, takeWhile, take, toArray, every } from "./iterable/operators";

test.test("project-euler", test => {
    test.test("#1 Find the sum of all the multiples of 3 or 5 below 1000", test => {
        const result = $$(range(1, 999))
            .$(filter(x => x % 3 === 0 || x % 5 === 0))
            .$$(fold((x, y) => x + y));

        test.equals(result, 233168);
        test.end();
    });
    test.test("#2 find the sum of the even-valued terms of the fibonacci sequence below 4 million", test => {
        const fibonacci = () => $$(infinite())
            .$(scan(([prev, curr], _) => [curr, prev + curr], [0, 1]))
            .$$(map(([_, x]) => x));

        test.test("fibonacci", test => {
            const firstTen = $$(fibonacci())
                .$(take(10))
                .$$(toArray);
            test.deepEquals(firstTen, [1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
            test.end();
        });
        const result = $$(fibonacci())
            .$(filter(x => x % 2 == 0))
            .$(takeWhile(x => x < 4000000))
            .$$(fold((x, y) => x + y));
        test.equal(result, 4613732);
        test.end();
    });
    test.test("#3 find the largest prime factor of 600851475143", test => {
        const isPrime = (x: number) => $$(range(2, Math.sqrt(x) | 0)).$$(every(y => x % y !== 0));

        test.test("isPrime", test => {
            test.true(isPrime(3));
            test.true(isPrime(5));
            test.true(isPrime(29));
            test.false(isPrime(28));
            test.false(isPrime(44));
            test.false(isPrime(82));
            test.end();
        });

        const findLargestPrimeFactor = (v: number) => $$(range(0, Math.sqrt(v) | 0))
            .$(filter(x => v % x === 0))
            .$(filter(isPrime))
            .$$(fold((x, y) => x > y ? x : y));

        test.equals(findLargestPrimeFactor(13195), 29);
        test.equals(findLargestPrimeFactor(600851475143), 6857);
        test.end();
    });
    test.end();
});
