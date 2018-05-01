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
        const result = pipe_1.$$(generators_1.range(100, 900)).$(operators_1.map(x => 1000 - x))
            .$(operators_1.flatMap(lhs => pipe_1.$$(generators_1.range(100, 900)).$(operators_1.map(x => 1000 - x)).$$(operators_1.map(rhs => lhs * rhs))))
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
    test.end();
});
//# sourceMappingURL=project-euler.spec.js.map