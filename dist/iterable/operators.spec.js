"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Operators = require("./operators");
const tap_1 = require("tap");
tap_1.test("iterable/operators", test => {
    test.test("identity :: Iterable T -> Iterable T", test => {
        const input = ["a", "b", "c", "f"];
        const output = Array.from(Operators.identity(input));
        test.deepEqual(output, input);
        test.end();
    });
    test.test("tap :: ((T, Number) -> Unit) -> Iterable T -> Iterable T", test => {
        const input = ["a", "b", "c", "f"];
        const tapped = [];
        const output = Operators.tap((value, index) => tapped.push({ value, index }))(input);
        test.equal(tapped.length, 0);
        test.deepEqual(Array.from(output), input);
        test.deepEqual(tapped, [{ value: "a", index: 0 }, { value: "b", index: 1 }, { value: "c", index: 2 }, { value: "f", index: 3 }]);
        test.end();
    });
    test.test("map :: ((T, Number) -> U) -> Iterable T -> Iterable U", test => {
        const result = Operators.map((value, index) => ({ value: value + index, index }))(["a", "b", "c"]);
        test.deepEqual(Array.from(result), [{ value: "a0", index: 0 }, { value: "b1", index: 1 }, { value: "c2", index: 2 }]);
        test.end();
    });
    test.test("flatMap :: ((T, Number) -> U) -> Iterable T -> Iterable U", test => {
        const result = Operators.flatMap((value, index) => [index, { value: value + index, index }])(["a", "b", "c"]);
        test.deepEqual(Array.from(result), [0, { value: "a0", index: 0 }, 1, { value: "b1", index: 1 }, 2, { value: "c2", index: 2 }]);
        test.end();
    });
    test.test("filter :: ((T, Number) -> Boolean) -> Iterable T -> Iterable T", test => {
        const result = Operators.filter((value, index) => value.startsWith("a") && index % 2 === 0)(["aa", "ab", "ba", "az", "ae"]);
        test.deepEqual(Array.from(result), ["aa", "ae"]);
        test.end();
    });
    test.test("reduce :: ((U, T, Number) -> (Iterable T, U) -> U", test => {
        const result = Operators.reduce((prev, curr, index) => prev + parseInt(curr) + (index != 0 ? index : 1000), 100)(["10", "20", "30"]);
        test.equal(result, 1163);
        test.end();
    });
    test.test("scan :: ((U, T, Number) -> (Iterable T, U) -> Iterable U", test => {
        const result = Operators.scan((prev, curr, index) => prev + parseInt(curr) + (index != 0 ? index : 1000), 100)(["10", "20", "30"]);
        test.deepEqual(Array.from(result), [1110, 1131, 1163]);
        test.end();
    });
    test.test("fold :: ((T, T, Number) -> Iterable T -> Iterable T", test => {
        const result = Operators.fold((prev, curr, index) => (parseInt(prev) + parseInt(curr) + (index != 0 ? index : 1000)).toString())(["10", "20", "30"]);
        test.equal(result, "63");
        test.end();
    });
    test.test("take :: Number -> Iterable T -> Iterable T", test => {
        test.test("take :: Number 0 -> Iterable T -> Empty", test => {
            const result = Operators.take(0)([10, 11, 12, 13]);
            test.equal(Array.from(result).length, 0);
            test.end();
        });
        test.test("take :: Number < Length -> Iterable T -> Iterable T", test => {
            const result = Operators.take(2)([10, 11, 12, 13]);
            test.deepEqual(Array.from(result), [10, 11]);
            test.end();
        });
        test.test("take :: Number < 0 -> Iterable T -> Empty", test => {
            const result = Operators.take(-2)([10, 11, 12, 13]);
            test.deepEqual(Array.from(result).length, 0);
            test.end();
        });
        test.test("take :: Number > Length -> Iterable T -> Iterable T", test => {
            const result = Operators.take(10)([10, 11, 12, 13]);
            test.deepEqual(Array.from(result), [10, 11, 12, 13]);
            test.end();
        });
        test.end();
    });
    test.test("skip :: Number -> Iterable T -> Iterable T", test => {
        test.test("skip :: Number 0 -> Iterable T -> Iterable T", test => {
            const result = Operators.skip(0)([10, 11, 12, 13]);
            test.deepEqual(Array.from(result), [10, 11, 12, 13]);
            test.end();
        });
        test.test("skip :: Number < 0 -> Iterable T -> Iterable T", test => {
            const result = Operators.skip(-10)([10, 11, 12, 13]);
            test.deepEqual(Array.from(result), [10, 11, 12, 13]);
            test.end();
        });
        test.test("skip :: Number < Length -> Iterable T -> Iterable T", test => {
            const result = Operators.skip(2)([10, 11, 12, 13]);
            test.deepEqual(Array.from(result), [12, 13]);
            test.end();
        });
        test.test("skip :: Number > Length -> Iterable T -> Iterable T", test => {
            const result = Operators.skip(20)([10, 11, 12, 13]);
            test.deepEqual(Array.from(result), []);
            test.end();
        });
        test.end();
    });
    test.test("first :: Iterable T -> (T | undefined)", test => {
        test.test("first :: Iterable T -> T", test => {
            const result = Operators.first([5, 10, 15]);
            test.equal(5, result);
            test.end();
        });
        test.test("first :: Iterable T -> undefined", test => {
            const result = Operators.first([]);
            test.equal(undefined, result);
            test.end();
        });
        test.end();
    });
    test.test("last :: Iterable T -> (T | undefined)", test => {
        test.test("last :: Iterable T -> T", test => {
            const result = Operators.last([5, 10, 15]);
            test.equal(15, result);
            test.end();
        });
        test.test("last :: Iterable T -> undefined", test => {
            const result = Operators.last([]);
            test.equal(undefined, result);
            test.end();
        });
        test.end();
    });
    test.test("takeWhile :: ((T, Number) -> Boolean) -> Iterable T -> Iterable T", test => {
        const result = Operators.takeWhile((value, index) => value < 15 && index < 3)([10, 13, 15, 12, 18]);
        test.deepEqual(Array.from(result), [10, 13]);
        test.end();
    });
    test.test("takeUntil :: ((T, Number) -> Boolean) -> Iterable T -> Iterable T", test => {
        const result = Operators.takeUntil((value, index) => value > 15 || index > 2)([10, 13, 15, 12, 18]);
        test.deepEqual(Array.from(result), [10, 13, 15]);
        test.end();
    });
    test.test("skipWhile :: ((T, Number) -> Boolean) -> Iterable T -> Iterable T", test => {
        const result = Operators.skipWhile((value, index) => value < 15 && index < 3)([10, 13, 15, 12, 18]);
        test.deepEqual(Array.from(result), [15, 12, 18]);
        test.end();
    });
    test.test("skipUntil :: ((T, Number) -> Boolean) -> Iterable T -> Iterable T", test => {
        const result = Operators.skipUntil((value, index) => value > 15 || index > 2)([10, 13, 15, 12, 18]);
        test.deepEqual(Array.from(result), [12, 18]);
        test.end();
    });
    test.test("concat :: (...Iterable T) -> Iterable T -> Iterable T", test => {
        const result = Operators.concat([1, 2, 3], [], [5, 6, 7])([0, -1, -2]);
        test.deepEqual(Array.from(result), [0, -1, -2, 1, 2, 3, 5, 6, 7]);
        test.end();
    });
    test.test("push :: (...T) -> Iterable T -> Iterable T", test => {
        const result = Operators.push(1, 2, 3, 4, 5)([10, 11, 12]);
        test.deepEqual(Array.from(result), [10, 11, 12, 1, 2, 3, 4, 5]);
        test.end();
    });
    test.test("unshift :: (...T) -> Iterable T -> Iterable T", test => {
        const result = Operators.unshift(1, 2, 3, 4, 5)([10, 11, 12]);
        test.deepEqual(Array.from(result), [5, 4, 3, 2, 1, 10, 11, 12]);
        test.end();
    });
    test.test("unshift :: () -> Iterable T -> Iterable T", test => {
        const result = Operators.unshift()([10, 11, 12]);
        test.deepEqual(Array.from(result), [10, 11, 12]);
        test.end();
    });
    test.test("some :: ((T, Number) -> Boolean) -> Iterable T -> Boolean", test => {
        const trueResult = Operators.some((x, i) => x + i === 10)([1, 9, 3, 2]);
        const falseResult = Operators.some((x, i) => x + i === 10)([1, 8, 3, 2]);
        test.true(trueResult);
        test.false(falseResult);
        test.end();
    });
    test.test("every :: ((T, Number) -> Boolean) -> Iterable T -> Boolean", test => {
        const trueResult = Operators.every((x, i) => x + i !== 10)([1, 8, 3, 2]);
        const falseResult1 = Operators.every((x, i) => x + i === 10)([1, 9, 3, 2]);
        const falseResult2 = Operators.every((x, i) => x + i !== 10)([1, 9, 3, 2]);
        test.true(trueResult);
        test.false(falseResult1);
        test.false(falseResult2);
        test.end();
    });
    test.test("distinct :: Iterable T -> Iterable T", test => {
        const result = Operators.distinct([1, 2, 3, 4, 6, 3, 1, 2, 4, 9, 8]);
        test.deepEqual(Array.from(result), [1, 2, 3, 4, 6, 9, 8]);
        test.end();
    });
    test.test("distinctUntilChanged :: Iterable T -> Iterable T", test => {
        const result = Operators.distinctUntilChanged([1, 2, 2, 3, 4, 6, 6, 6, 3, 1, 1, 1, 2, 4, 4, 4, 9, 8]);
        test.deepEqual(Array.from(result), [1, 2, 3, 4, 6, 3, 1, 2, 4, 9, 8]);
        test.end();
    });
    test.test("distinctUntilKeyChanged :: Iterable T -> Iterable T", test => {
        const result = Operators.distinctUntilKeyChanged((v) => v % 10)([1, 2, 22, 2, 3, 4, 66, 6, 6, 6, 3, 1, 11, 21, 2, 4, 4, 4, 9, 8]);
        test.deepEqual(Array.from(result), [1, 2, 3, 4, 66, 3, 1, 2, 4, 9, 8]);
        test.end();
    });
    test.test("orderBy :: () -> Iterable T -> Iterable T", test => {
        const result = Operators.orderBy()([1, 8, 2, 4, 3, 2]);
        test.deepEqual(Array.from(result), [1, 2, 2, 3, 4, 8]);
        test.end();
    });
    test.test("orderBy :: (String -> Number, (Number, Number) -> Number) -> Iterable T -> Iterable T", test => {
        const result = Operators.orderBy((a) => parseInt(a.substr(1, 1), 10))(["11", "28", "52", "85", "94", "13"]);
        test.deepEqual(Array.from(result), ["11", "52", "13", "94", "85", "28"]);
        test.end();
    });
    test.test("orderBy :: (Number -> String, (String, Number) -> Number) -> Iterable T -> Iterable T", test => {
        const result = Operators.orderBy((a) => a.toString(), (a, b) => parseInt(b, 10) - parseInt(a, 10))([11, 38, 52, 84, 93, 22]);
        test.deepEqual(Array.from(result), ["93", "84", "52", "38", "22", "11"]);
        test.end();
    });
    test.test("flip :: Iterable T -> Iterable T", test => {
        const result = Operators.flip(["a", "pii", "piano", "a", "pii", "piano"]);
        test.deepEqual(Array.from(result), ["piano", "pii", "a", "piano", "pii", "a"]);
        test.end();
    });
    test.test("repeat :: Number -> Iterable T -> Iterable T", test => {
        const result = Operators.repeat(4)(["a", 2, 3]);
        test.deepEqual(Array.from(result), ["a", 2, 3, "a", 2, 3, "a", 2, 3, "a", 2, 3, "a", 2, 3]);
        test.end();
    });
    test.test("doppler :: Iterable T -> Iterable T", test => {
        const result = Operators.doppler(["a", 2, 3]);
        test.deepEqual(Array.from(result), ["a", 2, 3, 3, 2, "a"]);
        test.end();
    });
    test.test("shuffle :: Iterable T -> Iterable T", test => {
        const newOrder = [3, 1, 2, 4];
        const result = Operators.shuffle(["a", 2, 3, "c"], () => newOrder.shift() || 0);
        test.deepEqual(Array.from(result), [2, 3, "a", "c"]);
        test.end();
    });
    test.test("takeLast :: Number -> Iterable T -> Iterable T", test => {
        test.test("takeLast :: 3 -> Iterable T, N > 3 -> Iterable T", test => {
            const result = Operators.takeLast(3)(["a", "b", "c", "d", "e"]);
            test.deepEqual(Array.from(result), ["c", "d", "e"]);
            test.end();
        });
        test.test("takeLast :: 3 -> Iterable T, N == 3 -> Iterable T", test => {
            const result = Operators.takeLast(3)(["c", "d", "e"]);
            test.deepEqual(Array.from(result), ["c", "d", "e"]);
            test.end();
        });
        test.test("takeLast :: N < 0 -> Iterable T -> []", test => {
            const result = Operators.takeLast(-1)(["c", "d", "e"]);
            test.deepEqual(Array.from(result), []);
            test.end();
        });
        test.test("takeLast :: 3 -> Iterable T, N < 3 -> Iterable T", test => {
            const result = Operators.takeLast(3)(["d", "e"]);
            test.deepEqual(Array.from(result), ["d", "e"]);
            test.end();
        });
        test.end();
    });
    test.test("skipLast :: Number -> Iterable T -> Iterable T", test => {
        test.test("skipLast :: 3 -> Iterable T, N > 3 -> Iterable T", test => {
            const result = Operators.skipLast(3)(["a", "b", "c", "d", "e"]);
            test.deepEqual(Array.from(result), ["a", "b"]);
            test.end();
        });
        test.test("skipLast :: N < 0 -> Iterable T -> Iterable T", test => {
            const result = Operators.skipLast(-1)(["a", "b", "c", "d", "e"]);
            test.deepEqual(Array.from(result), ["a", "b", "c", "d", "e"]);
            test.end();
        });
        test.test("skipLast :: 3 -> Iterable T, N == 3 -> Iterable T", test => {
            const result = Operators.skipLast(3)(["c", "d", "e"]);
            test.deepEqual(Array.from(result), []);
            test.end();
        });
        test.test("skipLast :: 3 -> Iterable T, N < 3 -> Iterable T", test => {
            const result = Operators.skipLast(3)(["d", "e"]);
            test.deepEqual(Array.from(result), []);
            test.end();
        });
        test.end();
    });
    test.test("elementAtOrDefault :: (N, U) -> Iterable T -> T | U", test => {
        test.test("elementAtOrDefault :: (2, undefined) -> Iterable T, N > 2 -> T", test => {
            const result = Operators.elementAtOrDefault(2, undefined)(["a", "b", "c", "d"]);
            test.equals(result, "c");
            test.end();
        });
        test.test("elementAtOrDefault :: (5, 'other') -> Iterable T, N < 5 -> 'other'", test => {
            const result = Operators.elementAtOrDefault(5, "other")(["a", "b", "c"]);
            test.equals(result, "other");
            test.end();
        });
        test.test("elementAtOrDefault :: (N < 0, 'other') -> Iterable T -> 'other'", test => {
            const result = Operators.elementAtOrDefault(-1, "other")(["a", "b", "c"]);
            test.equals(result, "other");
            test.end();
        });
        test.end();
    });
    test.test("or :: Iterable T -> Iterable T -> Iterable T", test => {
        test.test("or :: L -> R -> R", test => {
            const result = Operators.or([1, 2, 3])([4, 5, 6]);
            test.deepEqual(Array.from(result), [4, 5, 6]);
            test.end();
        });
        test.test("or :: L -> Empty -> L", test => {
            const result = Operators.or([1, 2, 3])([]);
            test.deepEqual(Array.from(result), [1, 2, 3]);
            test.end();
        });
        test.test("or :: Empty -> Empty -> Empty", test => {
            const result = Operators.or([])([]);
            test.deepEqual(Array.from(result), []);
            test.end();
        });
        test.end();
    });
    test.test("toArray :: Iterable T -> Array T", test => {
        const result = Operators.toArray([1, 2, 3, 4, 5, 6]);
        test.deepEqual(result, [1, 2, 3, 4, 5, 6]);
        test.end();
    });
    test.test("updateAt :: (N, T) -> Iterable T -> Iterable T", test => {
        test.test("updateAt :: (0, T) -> Iterable T, N > 3 -> (T ++ Iterable T)", test => {
            const result = Operators.updateAt(0, 25)([1, 2, 3, 4, 5]);
            test.deepEquals(Array.from(result), [25, 2, 3, 4, 5]);
            test.end();
        });
        test.test("updateAt :: (3, T) -> Iterable T, N > 3 -> (Iterable T ++ T ++ Iterable T)", test => {
            const result = Operators.updateAt(3, 25)([1, 2, 3, 4, 5]);
            test.deepEquals(Array.from(result), [1, 2, 3, 25, 5]);
            test.end();
        });
        test.test("updateAt :: (-3, T) -> Iterable T -> Iterable T", test => {
            const result = Operators.updateAt(-3, 25)([1, 2, 3, 4, 5]);
            test.deepEquals(Array.from(result), [1, 2, 3, 4, 5]);
            test.end();
        });
        test.test("updateAt :: (6, T) -> Iterable T, N < 6 -> Iterable T", test => {
            const result = Operators.updateAt(6, 25)([1, 2, 3, 4, 5]);
            test.deepEquals(Array.from(result), [1, 2, 3, 4, 5]);
            test.end();
        });
        test.end();
    });
    test.test("removeAt :: (N, T) -> Iterable T -> Iterable T", test => {
        test.test("removeAt :: (0, T) -> Iterable T, N > 0 -> (T ++ Iterable T)", test => {
            const result = Operators.removeAt(0)([1, 2, 3, 4, 5]);
            test.deepEquals(Array.from(result), [2, 3, 4, 5]);
            test.end();
        });
        test.test("removeAt :: (3, T) -> Iterable T, N > 3 -> (Iterable T ++ T ++ Iterable T)", test => {
            const result = Operators.removeAt(3)([1, 2, 3, 4, 5]);
            test.deepEquals(Array.from(result), [1, 2, 3, 5]);
            test.end();
        });
        test.test("removeAt :: (-3, T) -> Iterable T -> Iterable T", test => {
            const result = Operators.removeAt(-3)([1, 2, 3, 4, 5]);
            test.deepEquals(Array.from(result), [1, 2, 3, 4, 5]);
            test.end();
        });
        test.test("removeAt :: (6, T) -> Iterable T, N < 6 -> Iterable T", test => {
            const result = Operators.removeAt(6)([1, 2, 3, 4, 5]);
            test.deepEquals(Array.from(result), [1, 2, 3, 4, 5]);
            test.end();
        });
        test.end();
    });
    test.test("count :: Iterable T -> Number", test => {
        test.equals(Operators.count([]), 0);
        test.equals(Operators.count([1, 4, 5, 6, 7]), 5);
        test.end();
    });
    test.test("empty :: Iterable T -> Boolean", test => {
        test.true(Operators.empty([]));
        test.false(Operators.empty([1, 4, 5, 6, 7]));
        test.end();
    });
    test.end();
});
//# sourceMappingURL=operators.spec.js.map