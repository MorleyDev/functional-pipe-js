"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generators = require("./generators");
const Operators = require("./operators");
const tap_1 = require("tap");
tap_1.test("async-iterable/operators", async (test) => {
    test.test("unit :: AsyncIterable T -> AsyncIterable T", async (test) => {
        const input = ["a", "b", "c", "f"];
        const output = await Operators.toArray(Operators.unit(Generators.from(input)));
        test.deepEqual(output, input);
        test.end();
    });
    test.test("tap :: ((T, Number) -> Unit) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const input = ["a", "b", "c", "f"];
        const tapped = [];
        const output = Operators.tap((value, index) => tapped.push({ value, index }))(Generators.from(input));
        test.equal(tapped.length, 0);
        test.deepEqual(await Operators.toArray(output), input);
        test.deepEqual(tapped, [{ value: "a", index: 0 }, { value: "b", index: 1 }, { value: "c", index: 2 }, { value: "f", index: 3 }]);
        test.end();
    });
    test.test("tap :: ((T, Number) -> Promise Unit) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const input = ["a", "b", "c", "f"];
        const tapped = [];
        const output = Operators.tap(async (value, index) => tapped.push({ value, index }))(Generators.from(input));
        test.equal(tapped.length, 0);
        test.deepEqual(await Operators.toArray(output), input);
        test.deepEqual(tapped, [{ value: "a", index: 0 }, { value: "b", index: 1 }, { value: "c", index: 2 }, { value: "f", index: 3 }]);
        test.end();
    });
    test.test("map :: ((T, Number) -> U) -> AsyncIterable T -> AsyncIterable U", async (test) => {
        const result = Operators.map((value, index) => ({ value: value + index, index }))(Generators.from(["a", "b", "c"]));
        test.deepEqual(await Operators.toArray(result), [{ value: "a0", index: 0 }, { value: "b1", index: 1 }, { value: "c2", index: 2 }]);
        test.end();
    });
    test.test("map :: ((T, Number) -> Promise U) -> AsyncIterable T -> AsyncIterable U", async (test) => {
        const result = Operators.map(async (value, index) => ({ value: value + index, index }))(Generators.from(["a", "b", "c"]));
        test.deepEqual(await Operators.toArray(result), [{ value: "a0", index: 0 }, { value: "b1", index: 1 }, { value: "c2", index: 2 }]);
        test.end();
    });
    test.test("flatMap :: ((T, Number) -> Iterable U) -> AsyncIterable T -> AsyncIterable U", async (test) => {
        const result = Operators.flatMap((value, index) => [index, { value: value + index, index }])(Generators.from(["a", "b", "c"]));
        test.deepEqual(await Operators.toArray(result), [0, { value: "a0", index: 0 }, 1, { value: "b1", index: 1 }, 2, { value: "c2", index: 2 }]);
        test.end();
    });
    test.test("flatMap :: ((T, Number) -> AsyncIterable U) -> AsyncIterable T -> AsyncIterable U", async (test) => {
        const result = Operators.flatMap((value, index) => Generators.from([index, { value: value + index, index }]))(Generators.from(["a", "b", "c"]));
        test.deepEqual(await Operators.toArray(result), [0, { value: "a0", index: 0 }, 1, { value: "b1", index: 1 }, 2, { value: "c2", index: 2 }]);
        test.end();
    });
    test.test("filter :: ((T, Number) -> Boolean) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.filter((value, index) => value.startsWith("a") && index % 2 === 0)(Generators.from(["aa", "ab", "ba", "az", "ae"]));
        test.deepEqual(await Operators.toArray(result), ["aa", "ae"]);
        test.end();
    });
    test.test("filter :: ((T, Number) -> Promise Boolean) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.filter(async (value, index) => value.startsWith("a") && index % 2 === 0)(Generators.from(["aa", "ab", "ba", "az", "ae"]));
        test.deepEqual(await Operators.toArray(result), ["aa", "ae"]);
        test.end();
    });
    test.test("reduce :: ((U, T, Number) -> (AsyncIterable T, U) -> Promise U", async (test) => {
        const result = await Operators.reduce((prev, curr, index) => prev + parseInt(curr) + index, 100)(Generators.from(["10", "20", "30"]));
        test.equal(result, 163);
        test.end();
    });
    test.test("reduce :: ((U, T, Number) -> (AsyncIterable T, Promise U) -> Promise U", async (test) => {
        const result = await Operators.reduce(async (prev, curr, index) => prev + parseInt(curr) + index, 100)(Generators.from(["10", "20", "30"]));
        test.equal(result, 163);
        test.end();
    });
    test.test("scan :: ((U, T, Number) -> U) -> AsyncIterable T -> AsyncIterable U", async (test) => {
        const result = Operators.scan((prev, curr, index) => prev + parseInt(curr) + index, 100)(Generators.from(["10", "20", "30"]));
        test.deepEqual(await Operators.toArray(result), [110, 131, 163]);
        test.end();
    });
    test.test("scan :: ((U, T, Number) -> Promise U) -> AsyncIterable T -> AsyncIterable U", async (test) => {
        const result = Operators.scan(async (prev, curr, index) => prev + parseInt(curr) + index, 100)(Generators.from(["10", "20", "30"]));
        test.deepEqual(await Operators.toArray(result), [110, 131, 163]);
        test.end();
    });
    test.test("fold :: ((T, T, Number) -> T) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = await Operators.fold((prev, curr, index) => (parseInt(prev) + parseInt(curr) + index).toString())(Generators.from(["10", "20", "30"]));
        test.equal(result, "63");
        test.end();
    });
    test.test("fold :: (T, T, Number) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = await Operators.fold((prev, curr, index) => (parseInt(prev) + parseInt(curr) + index).toString())(Generators.from(["10", "20", "30"]));
        test.equal(result, "63");
        test.end();
    });
    test.test("take :: Number -> AsyncIterable T -> AsyncIterable T", async (test) => {
        test.test("take :: Number 0 -> AsyncIterable T -> Empty", async (test) => {
            const result = Operators.take(0)(Generators.from([10, 11, 12, 13]));
            test.equal(await Operators.toArray(result), []);
            test.end();
        });
        test.test("take :: Number < Length -> AsyncIterable T -> AsyncIterable T", async (test) => {
            const result = Operators.take(2)(Generators.from([10, 11, 12, 13]));
            test.deepEqual(await Operators.toArray(result), [10, 11]);
            test.end();
        });
        test.test("take :: Number < 0 -> AsyncIterable T -> Empty", async (test) => {
            const result = Operators.take(-2)(Generators.from([10, 11, 12, 13]));
            test.deepEqual(await Operators.toArray(result), []);
            test.end();
        });
        test.test("take :: Number > Length -> AsyncIterable T -> AsyncIterable T", async (test) => {
            const result = Operators.take(10)(Generators.from([10, 11, 12, 13]));
            test.deepEqual(await Operators.toArray(result), [10, 11, 12, 13]);
            test.end();
        });
        test.end();
    });
    test.test("skip :: Number -> AsyncIterable T -> AsyncIterable T", async (test) => {
        test.test("skip :: Number 0 -> AsyncIterable T -> AsyncIterable T", async (test) => {
            const result = Operators.skip(0)(Generators.from([10, 11, 12, 13]));
            test.deepEqual(await Operators.toArray(result), [10, 11, 12, 13]);
            test.end();
        });
        test.test("skip :: Number < 0 -> AsyncIterable T -> AsyncIterable T", async (test) => {
            const result = Operators.skip(-10)(Generators.from([10, 11, 12, 13]));
            test.deepEqual(await Operators.toArray(result), [10, 11, 12, 13]);
            test.end();
        });
        test.test("skip :: Number < Length -> AsyncIterable T -> AsyncIterable T", async (test) => {
            const result = Operators.skip(2)(Generators.from([10, 11, 12, 13]));
            test.deepEqual(await Operators.toArray(result), [12, 13]);
            test.end();
        });
        test.test("skip :: Number > Length -> AsyncIterable T -> AsyncIterable T", async (test) => {
            const result = Operators.skip(20)(Generators.from([10, 11, 12, 13]));
            test.deepEqual(await Operators.toArray(result), []);
            test.end();
        });
        test.end();
    });
    test.test("first :: AsyncIterable T -> (T | undefined)", async (test) => {
        test.test("first :: AsyncIterable T -> T", async (test) => {
            const result = await Operators.first(Generators.from([5, 10, 15]));
            test.equal(5, result);
            test.end();
        });
        test.test("first :: AsyncIterable T -> undefined", async (test) => {
            const result = await Operators.first(Generators.from([]));
            test.equal(undefined, result);
            test.end();
        });
        test.end();
    });
    test.test("last :: AsyncIterable T -> (T | undefined)", async (test) => {
        test.test("last :: AsyncIterable T -> T", async (test) => {
            const result = await Operators.last(Generators.from([5, 10, 15]));
            test.equal(15, result);
            test.end();
        });
        test.test("last :: AsyncIterable T -> undefined", async (test) => {
            const result = await Operators.last(Generators.from([]));
            test.equal(undefined, result);
            test.end();
        });
        test.end();
    });
    test.test("takeWhile :: ((T, Number) -> Boolean) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.takeWhile((value, index) => value < 15 && index < 3)(Generators.from([10, 13, 15, 12, 18]));
        test.deepEqual(await Operators.toArray(result), [10, 13]);
        test.end();
    });
    test.test("takeWhile :: ((T, Number) -> Promise Boolean) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.takeWhile(async (value, index) => value < 15 && index < 3)(Generators.from([10, 13, 15, 12, 18]));
        test.deepEqual(await Operators.toArray(result), [10, 13]);
        test.end();
    });
    test.test("takeUntil :: ((T, Number) -> Boolean) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.takeUntil((value, index) => value > 15 || index > 2)(Generators.from([10, 13, 15, 12, 18]));
        test.deepEqual(await Operators.toArray(result), [10, 13, 15]);
        test.end();
    });
    test.test("takeUntil :: ((T, Number) -> Promise Boolean) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.takeUntil(async (value, index) => value > 15 || index > 2)(Generators.from([10, 13, 15, 12, 18]));
        test.deepEqual(await Operators.toArray(result), [10, 13, 15]);
        test.end();
    });
    test.test("skipWhile :: ((T, Number) -> Boolean) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.skipWhile((value, index) => value < 15 && index < 3)(Generators.from([10, 13, 15, 12, 18]));
        test.deepEqual(await Operators.toArray(result), [15, 12, 18]);
        test.end();
    });
    test.test("skipWhile :: ((T, Number) -> Promise Boolean) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.skipWhile(async (value, index) => value < 15 && index < 3)(Generators.from([10, 13, 15, 12, 18]));
        test.deepEqual(await Operators.toArray(result), [15, 12, 18]);
        test.end();
    });
    test.test("skipUntil :: ((T, Number) -> Boolean) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.skipUntil((value, index) => value > 15 || index > 2)(Generators.from([10, 13, 15, 12, 18]));
        test.deepEqual(await Operators.toArray(result), [12, 18]);
        test.end();
    });
    test.test("skipUntil :: ((T, Number) -> Promise Boolean) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.skipUntil(async (value, index) => value > 15 || index > 2)(Generators.from([10, 13, 15, 12, 18]));
        test.deepEqual(await Operators.toArray(result), [12, 18]);
        test.end();
    });
    test.test("concat :: (...AsyncIterable T) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.concat(Generators.from([1, 2, 3]), Generators.from([]), Generators.from([5, 6, 7]))(Generators.from([0, -1, -2]));
        test.deepEqual(await Operators.toArray(result), [0, -1, -2, 1, 2, 3, 5, 6, 7]);
        test.end();
    });
    test.test("push :: (...T) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.push(1, 2, 3, 4, 5)(Generators.from([10, 11, 12]));
        test.deepEqual(await Operators.toArray(result), [10, 11, 12, 1, 2, 3, 4, 5]);
        test.end();
    });
    test.test("unshift :: (...T) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.unshift(1, 2, 3, 4, 5)(Generators.from([10, 11, 12]));
        test.deepEqual(await Operators.toArray(result), [5, 4, 3, 2, 1, 10, 11, 12]);
        test.end();
    });
    test.test("unshift :: () -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.unshift()(Generators.from([10, 11, 12]));
        test.deepEqual(await Operators.toArray(result), [10, 11, 12]);
        test.end();
    });
    test.test("some :: ((T, Number) -> Boolean) -> AsyncIterable T -> Boolean", async (test) => {
        const trueResult = Operators.some((x, i) => x + i === 10)(Generators.from([1, 9, 3, 2]));
        const falseResult = Operators.some((x, i) => x + i === 10)(Generators.from([1, 8, 3, 2]));
        test.true(trueResult);
        test.false(falseResult);
        test.end();
    });
    test.test("some :: ((T, Number) -> Promise Boolean) -> AsyncIterable T -> Boolean", async (test) => {
        const trueResult = Operators.some(async (x, i) => x + i === 10)(Generators.from([1, 9, 3, 2]));
        const falseResult = Operators.some(async (x, i) => x + i === 10)(Generators.from([1, 8, 3, 2]));
        test.true(trueResult);
        test.false(falseResult);
        test.end();
    });
    test.test("every :: ((T, Number) -> Boolean) -> AsyncIterable T -> Boolean", async (test) => {
        const trueResult = Operators.every((x, i) => x + i !== 10)(Generators.from([1, 8, 3, 2]));
        const falseResult1 = Operators.every((x, i) => x + i === 10)(Generators.from([1, 9, 3, 2]));
        const falseResult2 = Operators.every((x, i) => x + i !== 10)(Generators.from([1, 9, 3, 2]));
        test.true(trueResult);
        test.false(falseResult1);
        test.false(falseResult2);
        test.end();
    });
    test.test("every :: ((T, Number) -> Promise Boolean) -> AsyncIterable T -> Boolean", async (test) => {
        const trueResult = Operators.every(async (x, i) => x + i !== 10)(Generators.from([1, 8, 3, 2]));
        const falseResult1 = Operators.every(async (x, i) => x + i === 10)(Generators.from([1, 9, 3, 2]));
        const falseResult2 = Operators.every(async (x, i) => x + i !== 10)(Generators.from([1, 9, 3, 2]));
        test.true(trueResult);
        test.false(falseResult1);
        test.false(falseResult2);
        test.end();
    });
    test.test("distinct :: AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.distinct(Generators.from([1, 2, 3, 4, 6, 3, 1, 2, 4, 9, 8]));
        test.deepEqual(await Operators.toArray(result), [1, 2, 3, 4, 6, 9, 8]);
        test.end();
    });
    test.test("orderBy :: () -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.orderBy()(Generators.from([1, 8, 2, 4, 3, 2]));
        test.deepEqual(await Operators.toArray(result), [1, 2, 2, 3, 4, 8]);
        test.end();
    });
    test.test("orderBy :: (String -> Number, (Number, Number) -> Number) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.orderBy((a) => parseInt(a.substr(1, 1), 10))(Generators.from(["11", "28", "52", "85", "94", "13"]));
        test.deepEqual(await Operators.toArray(result), ["11", "52", "13", "94", "85", "28"]);
        test.end();
    });
    test.test("orderBy :: (Number -> String, (String, Number) -> Number) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.orderBy((a) => a.toString(), (a, b) => parseInt(b, 10) - parseInt(a, 10))(Generators.from([11, 38, 52, 84, 93, 22]));
        test.deepEqual(await Operators.toArray(result), ["93", "84", "52", "38", "22", "11"]);
        test.end();
    });
    test.test("flip :: AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.flip(Generators.from(["a", "pii", "piano", "a", "pii", "piano"]));
        test.deepEqual(await Operators.toArray(result), ["piano", "pii", "a", "piano", "pii", "a"]);
        test.end();
    });
    test.test("repeat :: Number -> AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.repeat(4)(Generators.from(["a", 2, 3]));
        test.deepEqual(await Operators.toArray(result), ["a", 2, 3, "a", 2, 3, "a", 2, 3, "a", 2, 3, "a", 2, 3]);
        test.end();
    });
    test.test("doppler :: AsyncIterable T -> AsyncIterable T", async (test) => {
        const result = Operators.doppler(Generators.from(["a", 2, 3]));
        test.deepEqual(await Operators.toArray(result), ["a", 2, 3, 3, 2, "a"]);
        test.end();
    });
    test.test("shuffle :: AsyncIterable T -> AsyncIterable T", async (test) => {
        const newOrder = [3, 1, 2, 4];
        const result = Operators.shuffle(Generators.from(["a", 2, 3, "c"]), () => newOrder.shift() || 0);
        test.deepEqual(await Operators.toArray(result), [2, 3, "a", "c"]);
        test.end();
    });
    test.test("takeLast :: Number -> AsyncIterable T -> AsyncIterable T", async (test) => {
        test.test("takeLast :: 3 -> AsyncIterable T, N > 3 -> AsyncIterable T", async (test) => {
            const result = Operators.takeLast(3)(Generators.from(["a", "b", "c", "d", "e"]));
            test.deepEqual(await Operators.toArray(result), ["c", "d", "e"]);
            test.end();
        });
        test.test("takeLast :: 3 -> AsyncIterable T, N == 3 -> AsyncIterable T", async (test) => {
            const result = Operators.takeLast(3)(Generators.from(["c", "d", "e"]));
            test.deepEqual(await Operators.toArray(result), ["c", "d", "e"]);
            test.end();
        });
        test.test("takeLast :: N < 0 -> AsyncIterable T -> []", async (test) => {
            const result = Operators.takeLast(-1)(Generators.from(["c", "d", "e"]));
            test.deepEqual(await Operators.toArray(result), []);
            test.end();
        });
        test.test("takeLast :: 3 -> AsyncIterable T, N < 3 -> AsyncIterable T", async (test) => {
            const result = Operators.takeLast(3)(Generators.from(["d", "e"]));
            test.deepEqual(await Operators.toArray(result), ["d", "e"]);
            test.end();
        });
        test.end();
    });
    test.test("skipLast :: Number -> AsyncIterable T -> AsyncIterable T", async (test) => {
        test.test("skipLast :: 3 -> AsyncIterable T, N > 3 -> AsyncIterable T", async (test) => {
            const result = Operators.skipLast(3)(Generators.from(["a", "b", "c", "d", "e"]));
            test.deepEqual(await Operators.toArray(result), ["a", "b"]);
            test.end();
        });
        test.test("skipLast :: N < 0 -> AsyncIterable T -> AsyncIterable T", async (test) => {
            const result = Operators.skipLast(-1)(Generators.from(["a", "b", "c", "d", "e"]));
            test.deepEqual(await Operators.toArray(result), ["a", "b", "c", "d", "e"]);
            test.end();
        });
        test.test("skipLast :: 3 -> AsyncIterable T, N == 3 -> AsyncIterable T", async (test) => {
            const result = Operators.skipLast(3)(Generators.from(["c", "d", "e"]));
            test.deepEqual(await Operators.toArray(result), []);
            test.end();
        });
        test.test("skipLast :: 3 -> AsyncIterable T, N < 3 -> AsyncIterable T", async (test) => {
            const result = Operators.skipLast(3)(Generators.from(["d", "e"]));
            test.deepEqual(await Operators.toArray(result), []);
            test.end();
        });
        test.end();
    });
    test.test("elementAtOrDefault :: (N, U) -> AsyncIterable T -> T | U", async (test) => {
        test.test("elementAtOrDefault :: (2, undefined) -> AsyncIterable T, N > 2 -> T", async (test) => {
            const result = await Operators.elementAtOrDefault(2, undefined)(Generators.from(["a", "b", "c", "d"]));
            test.equals(result, "c");
            test.end();
        });
        test.test("elementAtOrDefault :: (5, 'other') -> AsyncIterable T, N < 5 -> 'other'", async (test) => {
            const result = await Operators.elementAtOrDefault(5, "other")(Generators.from(["a", "b", "c"]));
            test.equals(result, "other");
            test.end();
        });
        test.test("elementAtOrDefault :: (N < 0, 'other') -> AsyncIterable T -> 'other'", async (test) => {
            const result = await Operators.elementAtOrDefault(-1, "other")(Generators.from(["a", "b", "c"]));
            test.equals(result, "other");
            test.end();
        });
        test.end();
    });
    test.test("or :: AsyncIterable T -> AsyncIterable T -> AsyncIterable T", async (test) => {
        test.test("or :: L -> R -> R", async (test) => {
            const result = Operators.or(Generators.from([1, 2, 3]))(Generators.from([4, 5, 6]));
            test.deepEqual(await Operators.toArray(result), [4, 5, 6]);
            test.end();
        });
        test.test("or :: L -> Empty -> L", async (test) => {
            const result = Operators.or(Generators.from([1, 2, 3]))(Generators.from([]));
            test.deepEqual(await Operators.toArray(result), [1, 2, 3]);
            test.end();
        });
        test.test("or :: Empty -> Empty -> Empty", async (test) => {
            const result = Operators.or(Generators.from([]))(Generators.from([]));
            test.deepEqual(await Operators.toArray(result), []);
            test.end();
        });
        test.end();
    });
    test.test("toArray :: AsyncIterable T -> Array T", async (test) => {
        const result = await Operators.toArray(Generators.from([1, 2, 3, 4, 5, 6]));
        test.deepEqual(result, [1, 2, 3, 4, 5, 6]);
        test.end();
    });
    test.test("updateAt :: (N, T) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        test.test("updateAt :: (0, T) -> AsyncIterable T, N > 3 -> (T ++ AsyncIterable T)", async (test) => {
            const result = Operators.updateAt(0, 25)(Generators.from([1, 2, 3, 4, 5]));
            test.deepEquals(await Operators.toArray(result), [25, 2, 3, 4, 5]);
            test.end();
        });
        test.test("updateAt :: (3, T) -> AsyncIterable T, N > 3 -> (AsyncIterable T ++ T ++ AsyncIterable T)", async (test) => {
            const result = Operators.updateAt(3, 25)(Generators.from([1, 2, 3, 4, 5]));
            test.deepEquals(await Operators.toArray(result), [1, 2, 3, 25, 5]);
            test.end();
        });
        test.test("updateAt :: (-3, T) -> AsyncIterable T -> AsyncIterable T", async (test) => {
            const result = Operators.updateAt(-3, 25)(Generators.from([1, 2, 3, 4, 5]));
            test.deepEquals(await Operators.toArray(result), [1, 2, 3, 4, 5]);
            test.end();
        });
        test.test("updateAt :: (6, T) -> AsyncIterable T, N < 6 -> AsyncIterable T", async (test) => {
            const result = Operators.updateAt(6, 25)(Generators.from([1, 2, 3, 4, 5]));
            test.deepEquals(await Operators.toArray(result), [1, 2, 3, 4, 5]);
            test.end();
        });
        test.end();
    });
    test.test("removeAt :: (N, T) -> AsyncIterable T -> AsyncIterable T", async (test) => {
        test.test("removeAt :: (0, T) -> AsyncIterable T, N > 0 -> (T ++ AsyncIterable T)", async (test) => {
            const result = Operators.removeAt(0)(Generators.from([1, 2, 3, 4, 5]));
            test.deepEquals(await Operators.toArray(result), [2, 3, 4, 5]);
            test.end();
        });
        test.test("removeAt :: (3, T) -> AsyncIterable T, N > 3 -> (AsyncIterable T ++ T ++ AsyncIterable T)", async (test) => {
            const result = Operators.removeAt(3)(Generators.from([1, 2, 3, 4, 5]));
            test.deepEquals(await Operators.toArray(result), [1, 2, 3, 5]);
            test.end();
        });
        test.test("removeAt :: (-3, T) -> AsyncIterable T -> AsyncIterable T", async (test) => {
            const result = Operators.removeAt(-3)(Generators.from([1, 2, 3, 4, 5]));
            test.deepEquals(await Operators.toArray(result), [1, 2, 3, 4, 5]);
            test.end();
        });
        test.test("removeAt :: (6, T) -> AsyncIterable T, N < 6 -> AsyncIterable T", async (test) => {
            const result = Operators.removeAt(6)(Generators.from([1, 2, 3, 4, 5]));
            test.deepEquals(await Operators.toArray(result), [1, 2, 3, 4, 5]);
            test.end();
        });
        test.end();
    });
    test.end();
});
//# sourceMappingURL=operators.spec.js.map