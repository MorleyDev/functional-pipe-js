"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Strings = require("./string/operators");
const test = require("tap");
const generators_1 = require("./iterable/generators");
const operators_1 = require("./iterable/operators");
const pipe_1 = require("./pipe");
const operators_2 = require("./function/operators");
test.test("project-euler", test => {
    const isPrime = (x) => x === 2 || pipe_1.$$(generators_1.range(2, Math.sqrt(x) | 0)).$$(operators_1.every(y => x % y !== 0));
    const isPowerOf = (pow) => (x) => {
        for (let i = pow; i <= x; i = i * pow) {
            if (i === x) {
                return true;
            }
        }
        return false;
    };
    const powersOf = (x) => pipe_1.$$(generators_1.infinite()).$$(operators_1.scan((p, _) => p * x, 1));
    const primeFactorsOf = (x) => pipe_1.$$(generators_1.primes(x - 1)).$(operators_1.takeUntil(p => p >= x)).$$(operators_1.filter(p => x % p == 0));
    const factorsOf = (x) => pipe_1.$$(primeFactorsOf(x))
        .$(operators_1.flatMap(pf => pipe_1.$$(generators_1.infinite())
        .$(operators_1.map(i => pf * (i + 1)))
        .$(operators_1.takeWhile(pf => pf < x))
        .$$(operators_1.filter(pf => x % pf === 0))))
        .$(operators_1.distinct)
        .$(operators_1.push(x))
        .$$(operators_1.unshift(1));
    const countDivisors = (x) => pipe_1.$$(factorsOf(x)).$$(operators_1.count);
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
        test.test("powersOf", test => {
            test.deepEquals(pipe_1.$$(powersOf(2)).$(operators_1.take(5)).$$(operators_1.toArray), [2, 4, 8, 16, 32]);
            test.deepEquals(pipe_1.$$(powersOf(3)).$(operators_1.take(5)).$$(operators_1.toArray), [3, 9, 27, 81, 243]);
            test.end();
        });
        test.test("primeFactorsOf", test => {
            test.deepEquals(pipe_1.$$(primeFactorsOf(20)).$$(operators_1.toArray), [2, 5]);
            test.deepEquals(pipe_1.$$(primeFactorsOf(21)).$$(operators_1.toArray), [3, 7]);
            test.deepEquals(pipe_1.$$(primeFactorsOf(84)).$$(operators_1.toArray), [2, 3, 7]);
            test.true(pipe_1.$$(primeFactorsOf(5)).$$(generators_1.empty));
            test.end();
        });
        test.test("factorsOf", test => {
            test.deepEquals(pipe_1.$$(factorsOf(20)).$(operators_1.orderBy(x => x)).$$(operators_1.toArray), [1, 2, 4, 5, 10, 20]);
            test.deepEquals(pipe_1.$$(factorsOf(5)).$(operators_1.orderBy(x => x)).$$(operators_1.toArray), [1, 5]);
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
        const result = pipe_1.$$(generators_1.fibonacci())
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
            const primesBelowCount = operators_1.toArray(generators_1.primes(count));
            const composites = pipe_1.$$(generators_1.range(1, count)).$(operators_1.filter(operators_2.not(isPrime))).$$(operators_1.toArray);
            const highestExponents = primesBelowCount
                .map(prime => composites.reduce(([prime, prev], curr) => isPowerOf(prime)(curr) ? [prime, curr] : [prime, prev], [prime, 0]))
                .filter(([_, i]) => i > 0);
            const finalSet = primesBelowCount.map(prime => {
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
        test.equals(result, 25164150);
        test.end();
    });
    test.test("#7 What is the 10001st prime number?", test => {
        const result = pipe_1.$$(generators_1.primes(200000)) /*we know it's below 200000*/
            .$(operators_1.skip(10000))
            .$$(operators_1.first);
        test.deepEquals(result, 104743);
        test.end();
    });
    test.test("#8 find the thirteen adjacent digits in the 1000-digit number with the greatest product", test => {
        const digits = `7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450`;
        const product = (val) => val.split("").map(x => parseInt(x, 10)).reduce((p, c) => p * c);
        const largestProduct = pipe_1.$$(generators_1.range(0, digits.length - 13))
            .$(operators_1.map((index) => pipe_1.$$(digits).$(Strings.substr(index, 13)).$$(product)))
            .$$(operators_1.fold((p, c) => p > c ? p : c));
        test.equals(largestProduct, 23514624000);
        test.end();
    });
    test.test("#9 find the pythagorean triplet for which a + b + c = 1000", test => {
        const abc = pipe_1.$$(generators_1.range(1, 500))
            .$(operators_1.map(a => ({ a, c: ((a ** 2 + 500000 - 1000 * a) / (1000 - a)) | 0 })))
            .$(operators_1.map(({ a, c }) => ({ a, b: (1000 - a - c) | 0, c })))
            .$(operators_1.filter(({ a, b, c }) => b > a && c > b))
            .$(operators_1.filter(({ a, b, c }) => a + b + c === 1000))
            .$(operators_1.filter(({ a, b, c }) => a ** 2 + b ** 2 === c ** 2))
            .$(operators_1.map(({ a, b, c }) => a * b * c))
            .$$(operators_1.first);
        test.equals(abc, 31875000);
        test.end();
    });
    test.test("#10 find the sum of primes below two million", test => {
        const result = pipe_1.$$(generators_1.primes(2000000)).$$(operators_1.fold((prev, curr) => prev + curr));
        test.equals(result, 142913828922);
        test.end();
    });
    test.test("#11 largest project of four adjacent numbers in a 20x20 grid", test => {
        const grid = [
            [8, 2, 22, 97, 38, 15, 0, 40, 0, 75, 4, 5, 7, 78, 52, 12, 50, 77, 91, 8],
            [49, 49, 99, 40, 17, 81, 18, 57, 60, 87, 17, 40, 98, 43, 69, 48, 4, 56, 62, 0],
            [81, 49, 31, 73, 55, 79, 14, 29, 93, 71, 40, 67, 53, 88, 30, 3, 49, 13, 36, 65],
            [52, 70, 95, 23, 4, 60, 11, 42, 69, 24, 68, 56, 1, 32, 56, 71, 37, 2, 36, 91],
            [22, 31, 16, 71, 51, 67, 63, 89, 41, 92, 36, 54, 22, 40, 40, 28, 66, 33, 13, 80],
            [24, 47, 32, 60, 99, 3, 45, 2, 44, 75, 33, 53, 78, 36, 84, 20, 35, 17, 12, 50],
            [32, 98, 81, 28, 64, 23, 67, 10, 26, 38, 40, 67, 59, 54, 70, 66, 18, 38, 64, 70],
            [67, 26, 20, 68, 2, 62, 12, 20, 95, 63, 94, 39, 63, 8, 40, 91, 66, 49, 94, 21],
            [24, 55, 58, 5, 66, 73, 99, 26, 97, 17, 78, 78, 96, 83, 14, 88, 34, 89, 63, 72],
            [21, 36, 23, 9, 75, 0, 76, 44, 20, 45, 35, 14, 0, 61, 33, 97, 34, 31, 33, 95],
            [78, 17, 53, 28, 22, 75, 31, 67, 15, 94, 3, 80, 4, 62, 16, 14, 9, 53, 56, 92],
            [16, 39, 5, 42, 96, 35, 31, 47, 55, 58, 88, 24, 0, 17, 54, 24, 36, 29, 85, 57],
            [86, 56, 0, 48, 35, 71, 89, 7, 5, 44, 44, 37, 44, 60, 21, 58, 51, 54, 17, 58],
            [19, 80, 81, 68, 5, 94, 47, 69, 28, 73, 92, 13, 86, 52, 17, 77, 4, 89, 55, 40],
            [4, 52, 8, 83, 97, 35, 99, 16, 7, 97, 57, 32, 16, 26, 26, 79, 33, 27, 98, 66],
            [88, 36, 68, 87, 57, 62, 20, 72, 3, 46, 33, 67, 46, 55, 12, 32, 63, 93, 53, 69],
            [4, 42, 16, 73, 38, 25, 39, 11, 24, 94, 72, 18, 8, 46, 29, 32, 40, 62, 76, 36],
            [20, 69, 36, 41, 72, 30, 23, 88, 34, 62, 99, 69, 82, 67, 59, 85, 74, 4, 36, 16],
            [20, 73, 35, 29, 78, 31, 90, 1, 74, 31, 49, 71, 48, 86, 81, 16, 23, 57, 5, 54],
            [1, 70, 54, 71, 83, 51, 54, 69, 16, 92, 33, 48, 61, 43, 52, 1, 89, 19, 67, 48]
        ];
        const horiz = () => pipe_1.$$(generators_1.range(0, 20)).$$(operators_1.flatMap(y => pipe_1.$$(generators_1.range(0, 17)).$$(operators_1.map(x => ({ x, y })))));
        const vert = () => pipe_1.$$(generators_1.range(0, 20)).$$(operators_1.flatMap(x => pipe_1.$$(generators_1.range(0, 17)).$$(operators_1.map(y => ({ x, y })))));
        const bdiag = () => pipe_1.$$(generators_1.range(0, 17)).$$(operators_1.flatMap(x => pipe_1.$$(generators_1.range(0, 17)).$$(operators_1.map(y => ({ x, y })))));
        const fdiag = () => pipe_1.$$(generators_1.range(0, 17)).$$(operators_1.flatMap(x => pipe_1.$$(generators_1.range(3, 17)).$$(operators_1.map(y => ({ x, y })))));
        const horizSet = pipe_1.$$(horiz())
            .$$(operators_1.map(({ x, y }) => pipe_1.$$(generators_1.range(0, 4))
            .$(operators_1.map(i => ({ x: x + i, y })))
            .$(operators_1.map(({ x, y }) => grid[x][y]))
            .$$(operators_1.reduce((p, v) => p * v, 1))));
        const vertSet = pipe_1.$$(vert())
            .$$(operators_1.map(({ x, y }) => pipe_1.$$(generators_1.range(0, 4))
            .$(operators_1.map(i => ({ x, y: y + i })))
            .$(operators_1.map(({ x, y }) => grid[x][y]))
            .$$(operators_1.reduce((p, v) => p * v, 1))));
        const bdiagSet = pipe_1.$$(bdiag())
            .$$(operators_1.map(({ x, y }) => pipe_1.$$(generators_1.range(0, 4))
            .$(operators_1.map(i => ({ x: x + i, y: y + i })))
            .$(operators_1.map(({ x, y }) => grid[x][y]))
            .$$(operators_1.reduce((p, v) => p * v, 1))));
        const fdiagSet = pipe_1.$$(fdiag())
            .$$(operators_1.map(({ x, y }) => pipe_1.$$(generators_1.range(0, 4))
            .$(operators_1.map(i => ({ x: x + i, y: y - i })))
            .$(operators_1.map(({ x, y }) => grid[x][y]))
            .$$(operators_1.reduce((p, v) => p * v, 1))));
        const max = pipe_1.$$(generators_1.concat(horizSet, vertSet, bdiagSet, fdiagSet)).$$(operators_1.reduce((p, c) => p < c ? c : p, 0));
        test.equals(max, 70600674);
        test.end();
    });
    test.test("#14 Longest Collatz sequence for a seed below one million", test => {
        function* collatz(seed) {
            function step(n) {
                return n % 2 === 0 ? n / 2 : (3 * n + 1);
            }
            for (let value = seed; value > 1; value = step(value)) {
                yield value;
            }
        }
        const result = pipe_1.$$(generators_1.range(1, 999999))
            .$(operators_1.map(x => ({ seed: x, count: operators_1.count(collatz(x)) })))
            .$$(operators_1.fold((p, c) => p.count > c.count ? p : c));
        test.equals(result && result.seed, 837799);
        test.end();
    });
    test.end();
});
//# sourceMappingURL=project-euler.spec.js.map