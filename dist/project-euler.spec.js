"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Strings = require("./string/operators");
const test = require("tap");
const operators_1 = require("./iterable/operators");
const generators_1 = require("./iterable/generators");
const pipe_1 = require("./pipe");
const operators_2 = require("./function/operators");
test.test("project-euler", test => {
    const isPrime = (x) => x === 2 || pipe_1.$$(generators_1.range(2, Math.sqrt(x) | 0)).$$(operators_1.every(y => x % y !== 0));
    const fibonacci = () => pipe_1.$$(generators_1.infinite())
        .$(operators_1.scan(([prev, curr], _) => [curr, prev + curr], [0, 1]))
        .$$(operators_1.map(([_, x]) => x));
    const isPowerOf = (pow) => (x) => {
        for (let i = pow; i <= x; i = i * pow) {
            if (i === x) {
                return true;
            }
        }
        return false;
    };
    test.test("utilities", test => {
        test.test("isPrime", test => {
            test.true(isPrime(2));
            test.true(isPrime(3));
            test.true(isPrime(5));
            test.true(isPrime(29));
            test.false(isPrime(28));
            test.false(isPrime(44));
            test.false(isPrime(82));
            test.end();
        });
        test.test("fibonacci", test => {
            const firstTen = pipe_1.$$(fibonacci())
                .$(operators_1.take(10))
                .$$(operators_1.toArray);
            test.deepEquals(firstTen, [1, 2, 3, 5, 8, 13, 21, 34, 55, 89]);
            test.end();
        });
        test.test("isPowerOf", test => {
            test.true(isPowerOf(2)(2));
            test.true(isPowerOf(2)(4));
            test.true(isPowerOf(2)(8));
            test.true(isPowerOf(3)(3));
            test.true(isPowerOf(3)(9));
            test.true(isPowerOf(3)(27));
            test.false(isPowerOf(3)(6));
            test.false(isPowerOf(2)(6));
            test.false(isPowerOf(2)(12));
            test.false(isPowerOf(3)(26));
            test.false(isPowerOf(3)(24));
            test.false(isPowerOf(3)(6));
            test.end();
        });
        test.end();
    });
    test.test("#1 Find the sum of all the multiples of 3 or 5 below 1000", test => {
        const result = pipe_1.$$(generators_1.range(1, 999))
            .$(operators_1.filter(x => x % 3 === 0 || x % 5 === 0))
            .$$(operators_1.fold((x, y) => x + y));
        test.equals(result, 233168);
        test.end();
    });
    test.test("#2 find the sum of the even-valued terms of the fibonacci sequence below 4 million", test => {
        const result = pipe_1.$$(fibonacci())
            .$(operators_1.filter(x => x % 2 == 0))
            .$(operators_1.takeWhile(x => x < 4000000))
            .$$(operators_1.fold((x, y) => x + y));
        test.equal(result, 4613732);
        test.end();
    });
    test.test("#3 find the largest prime factor of 600851475143", test => {
        const findLargestPrimeFactor = (v) => pipe_1.$$(generators_1.range(0, Math.sqrt(v) | 0))
            .$(operators_1.filter(x => v % x === 0))
            .$(operators_1.filter(isPrime))
            .$$(operators_1.fold((x, y) => x > y ? x : y));
        test.equals(findLargestPrimeFactor(13195), 29);
        test.equals(findLargestPrimeFactor(600851475143), 6857);
        test.end();
    });
    test.test("#4 find the largest palindrome made from the product of two 3-digit numbers", test => {
        const result = pipe_1.$$(generators_1.range(100, 900))
            .$(operators_1.flatMap(lhs => pipe_1.$$(generators_1.range(100, 900)).$$(operators_1.map(rhs => lhs * rhs))))
            .$(operators_1.filter(x => x.toString() === Strings.flip(x.toString())))
            .$$(operators_1.fold((x, y) => x > y ? x : y));
        test.equals(result, 906609);
        test.end();
    });
    test.test("#5 what is the smallest positive number that is evenly divisible by all numbers from 1 to 20", test => {
        function smallestDivisible(count) {
            const primes = pipe_1.$$(generators_1.range(2, count - 2)).$(operators_1.filter(isPrime)).$$(operators_1.toArray);
            const composites = pipe_1.$$(generators_1.range(1, count)).$(operators_1.filter(operators_2.not(isPrime))).$$(operators_1.toArray);
            const highestExponents = primes
                .map(prime => composites.reduce(([prime, prev], curr) => isPowerOf(prime)(curr) ? [prime, curr] : [prime, prev], [prime, 0]))
                .filter(([_, i]) => i > 0);
            const finalSet = primes.map(prime => {
                const exp = highestExponents.find(([p, ep]) => p === prime);
                return exp != null ? exp[1] : prime;
            });
            return finalSet.reduce((p, c) => p * c);
        }
        test.equals(smallestDivisible(10), 2520);
        test.equals(smallestDivisible(20), 232792560);
        test.end();
    });
    test.test("#6 find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum", test => {
        const sumOfSquares = pipe_1.$$(generators_1.range(1, 100))
            .$(operators_1.map(x => x ** 2))
            .$$(operators_1.fold((l, r) => l + r));
        const squareOfSums = pipe_1.$$(generators_1.range(1, 100))
            .$(operators_1.fold((l, r) => l + r))
            .$$(sum => sum ** 2);
        const result = Math.abs(sumOfSquares - squareOfSums);
        test.equals(result, 2640);
        test.equals(result, 2640);
        test.end();
    });
    test.end();
});
//# sourceMappingURL=project-euler.spec.js.map