"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("tap");
const pipe_1 = require("./pipe");
const generators_1 = require("./iterable/generators");
const operators_1 = require("./iterable/operators");
test.test("project-euler", test => {
    test.test("#1 Find the sum of all the multiples of 3 or 5 below 1000", test => {
        const result = pipe_1.$$(generators_1.range(1, 999))
            .$(operators_1.filter(x => x % 3 === 0 || x % 5 === 0))
            .$$(operators_1.fold((x, y) => x + y));
        test.equals(result, 233168);
        test.end();
    });
    test.test("#2 find the sum of the even-valued terms of the fibonacci sequence below 4 million", test => {
        const fibonacci = () => pipe_1.$$(generators_1.infinite())
            .$(operators_1.scan(([prev, curr], _) => [curr, prev + curr], [0, 1]))
            .$$(operators_1.map(([_, x]) => x));
        test.test("fibonacci", test => {
            const firstTen = pipe_1.$$(fibonacci())
                .$(operators_1.take(10))
                .$$(operators_1.toArray);
            test.deepEquals(firstTen, [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]);
            test.end();
        });
        const result = pipe_1.$$(fibonacci())
            .$(operators_1.filter(x => x % 2 == 0))
            .$(operators_1.takeWhile(x => x < 4000000))
            .$$(operators_1.fold((x, y) => x + y));
        test.equal(result, 4613732);
        test.end();
    });
    test.test("#3 find the largest prime factor of 600851475143", test => {
        const isPrime = (x) => pipe_1.$$(generators_1.range(2, Math.sqrt(x) | 0)).$$(operators_1.every(y => x % y !== 0));
        test.test("isPrime", test => {
            test.true(isPrime(3));
            test.true(isPrime(5));
            test.true(isPrime(29));
            test.false(isPrime(28));
            test.false(isPrime(44));
            test.false(isPrime(82));
            test.end();
        });
        const findLargestPrimeFactor = (v) => pipe_1.$$(generators_1.range(0, Math.sqrt(v) | 0))
            .$(operators_1.filter(x => v % x === 0))
            .$(operators_1.filter(isPrime))
            .$$(operators_1.fold((x, y) => x > y ? x : y));
        test.equals(findLargestPrimeFactor(13195), 29);
        test.equals(findLargestPrimeFactor(600851475143), 6857);
        test.end();
    });
    test.end();
});
//# sourceMappingURL=project-euler.spec.js.map