import * as Strings from "./string/operators";
import * as test from "tap";

import { every, filter, first, flatMap, fold, map, scan, skip, take, takeWhile, tap, toArray } from "./iterable/operators";
import { infinite, range } from "./iterable/generators";

import { $$ } from "./pipe";
import { not } from "./function/operators";

test.test("project-euler", test => {
	const isPrime = (x: number) => x === 2 || $$(range(2, Math.sqrt(x) | 0)).$$(every(y => x % y !== 0));
	const fibonacci = () => $$(infinite())
		.$(scan(([prev, curr], _) => [curr, prev + curr], [0, 1]))
		.$$(map(([_, x]) => x));

	const isPowerOf = (pow: number) => (x: number) => {
		for (let i = pow; i <= x; i = i * pow) {
			if (i === x) {
				return true;
			}
		}
		return false;
	}

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
			const firstTen = $$(fibonacci())
				.$(take(10))
				.$$(toArray);
			test.deepEquals(firstTen, [1, 2, 3, 5, 8, 13, 21, 34, 55, 89])
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
		const result = $$(range(1, 999))
			.$(filter(x => x % 3 === 0 || x % 5 === 0))
			.$$(fold((x, y) => x + y));

		test.equals(result, 233168);
		test.end();
	});
	test.test("#2 find the sum of the even-valued terms of the fibonacci sequence below 4 million", test => {

		const result = $$(fibonacci())
			.$(filter(x => x % 2 == 0))
			.$(takeWhile(x => x < 4000000))
			.$$(fold((x, y) => x + y));
		test.equal(result, 4613732);
		test.end();
	});
	test.test("#3 find the largest prime factor of 600851475143", test => {
		const findLargestPrimeFactor = (v: number) => $$(range(0, Math.sqrt(v) | 0))
			.$(filter(x => v % x === 0))
			.$(filter(isPrime))
			.$$(fold((x, y) => x > y ? x : y));

		test.equals(findLargestPrimeFactor(13195), 29);
		test.equals(findLargestPrimeFactor(600851475143), 6857);
		test.end();
	});
	test.test("#4 find the largest palindrome made from the product of two 3-digit numbers", test => {
		const result = $$(range(100, 900))
			.$(flatMap(lhs => $$(range(100, 900)).$$(map(rhs => lhs * rhs))))
			.$(filter(x => x.toString() === Strings.flip(x.toString())))
			.$$(fold((x, y) => x > y ? x : y));

		test.equals(result, 906609);
		test.end();
	});
	test.test("#5 what is the smallest positive number that is evenly divisible by all numbers from 1 to 20", test => {

		function smallestDivisible(count: number) {
			const primes = $$(range(2, count - 2)).$(filter(isPrime)).$$(toArray);
			console.log(primes);
			const composites = $$(range(1, count)).$(filter(not(isPrime))).$$(toArray);
			const highestExponents = primes
				.map(prime => composites.reduce(([prime, prev], curr) => isPowerOf(prime)(curr) ? [prime, curr] : [prime, prev], [prime, 0]))
				.filter(([_, i]) => i > 0);

			const finalSet = primes.map(prime => {
				const exp = highestExponents.find(([p, ep]) => p === prime);
				return exp != null ? exp[1] : prime;
			});
			console.log(finalSet);
			return finalSet.reduce((p, c) => p * c);
		}

		test.equals(smallestDivisible(10), 2520);
		test.equals(smallestDivisible(20), 232792560);
		test.end();
	});
	test.end();
});
