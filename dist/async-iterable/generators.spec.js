"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
Object.defineProperty(exports, "__esModule", { value: true });
const Generators = require("./generators");
const test = require("tap");
test.test("async-iterable/generators", test => {
    test.test("from :: Iterable T -> AsyncIterable T", async (test) => {
        const input = [1, 2, 4, 5];
        const output = Generators.from(input);
        const result = [];
        try {
            for (var output_1 = __asyncValues(output), output_1_1; output_1_1 = await output_1.next(), !output_1_1.done;) {
                const item = await output_1_1.value;
                result.push(item);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (output_1_1 && !output_1_1.done && (_a = output_1.return)) await _a.call(output_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        test.deepEquals(result, [1, 2, 4, 5]);
        test.end();
        var e_1, _a;
    });
    test.test("defer :: (() -> AsyncIterable T) -> AsyncIterable T", async (test) => {
        let executed = 0;
        const output = Generators.defer(() => {
            executed = executed + 1;
            return Generators.from([1, 2, 3]);
        });
        test.equals(executed, 0);
        let result = [];
        try {
            for (var output_2 = __asyncValues(output), output_2_1; output_2_1 = await output_2.next(), !output_2_1.done;) {
                const item = await output_2_1.value;
                result.push(item);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (output_2_1 && !output_2_1.done && (_a = output_2.return)) await _a.call(output_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        test.equals(executed, 1);
        test.deepEquals(result, [1, 2, 3]);
        result = [];
        try {
            for (var output_3 = __asyncValues(output), output_3_1; output_3_1 = await output_3.next(), !output_3_1.done;) {
                const item = await output_3_1.value;
                result.push(item);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (output_3_1 && !output_3_1.done && (_b = output_3.return)) await _b.call(output_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        test.equals(executed, 2);
        test.deepEquals(result, [1, 2, 3]);
        test.end();
        var e_2, _a, e_3, _b;
    });
    test.end();
});
//# sourceMappingURL=generators.spec.js.map