import * as Strings from "./string/operators";
import * as test from "tap";

import { distinctUntilChanged, every, filter, first, flatMap, fold, last, map, scan, skip, some, take, takeUntil, takeWhile, tap, toArray } from "./iterable/operators";
import { infinite, range } from "./iterable/generators";

import { $$ } from "./pipe";
import { not } from "./function/operators";

test.test("project-euler", test => {
	const isPrime = (x: number) => x === 2 || $$(range(2, Math.sqrt(x) | 0)).$$(every(y => x % y !== 0));
	const fibonacci = () => $$(infinite())
		.$(scan(([prev, curr], _) => [curr, prev + curr], [0, 1]))
		.$$(map(([_, x]) => x));

	const primes = () => $$(infinite())
		.$(scan((previousPrimes, index) => {
			switch (index) {
				case 0: return [];
				case 1: return [];
				case 2: return [2];
				default:
					return $$(previousPrimes).$(take(Math.sqrt(index) | 0)).$$(some(prime => index % prime === 0)) ? previousPrimes : [...previousPrimes, index];
			}
		}, [] as number[]))
		.$(map(primes => last(primes)!))
		.$$(distinctUntilChanged);

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
	test.test("primes", test => {
		const first6Primes = $$(primes()).$(take(6)).$$(toArray);
		test.deepEquals(first6Primes, [2, 3, 5, 7, 11, 13]);
		test.end();
	})

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
			const composites = $$(range(1, count)).$(filter(not(isPrime))).$$(toArray);
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
		const sumOfSquares = $$(range(1, 100))
			.$(map(x => x ** 2))
			.$$(fold((l, r) => l + r));

		const squareOfSums = $$(range(1, 100))
			.$(fold((l, r) => l + r))
			.$$(sum => sum ** 2);

		const result = Math.abs(sumOfSquares - squareOfSums);
		test.equals(result, 25164150);
		test.end();
	});
	test.test("#7 What is the 10001st prime number?", test => {
		const result = $$(primes())
			.$(skip(10000))
			.$$(first);

		test.deepEquals(result, 104743);
		test.end();
	});
	test.test("#8 find the thirteen adjacent digits in the 1000-digit number with the greatest product", test => {
		const digits = `7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450`;

		const product = (val: string) => val.split("").map(x => parseInt(x, 10)).reduce((p, c) => p * c);

		const largestProduct = $$(range(0, digits.length - 13))
			.$(map((index) => $$(digits).$(Strings.substr(index, 13)).$$(product)))
			.$$(fold((p, c) => p > c ? p : c));
		test.equals(largestProduct, 23514624000);
		test.end();
	});
	test.test("#9 find the pythagorean triplet for which a + b + c = 1000", test => {
		const abc = $$(range(1, 500))
			.$(map(a => ({ a, c: ((a ** 2 + 500000 - 1000 * a) / (1000 - a)) | 0 })))
			.$(map(({ a, c }) => ({ a, b: (1000 - a - c) | 0, c })))
			.$(filter(({ a, b, c }) => b > a && c > b))
			.$(filter(({ a, b, c }) => a + b + c === 1000))
			.$(filter(({ a, b, c }) => a ** 2 + b ** 2 === c ** 2))
			.$(map(({ a, b, c }) => a * b * c))
			.$$(first);
		test.equals(abc, 31875000);
		test.end();
	})
	test.test("#10 find the sum of primes below two million", test => {
		// https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
		let set = toArray(range(2, 2000000 - 1));
		let curr = 2;
		while (curr <= Math.sqrt(2000000)) {
			set = set.filter(s => s === curr || s % curr !== 0);
			curr = set.find(s => s > curr)!;
		}

		const result = $$(set).$$(fold((prev, curr) => prev + curr));
		test.equals(result, 142913828922);
		test.end();
	});
	test.end();
});
