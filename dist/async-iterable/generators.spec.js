"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generators = require("./generators");
const test = require("tap");
test.test("async-iterable/generators", test => {
    test.test("from :: Iterable T -> AsyncIterable T", async (test) => {
        const input = [1, 2, 4, 5];
        const output = Generators.from(input);
        const result = [];
        for await (const item of output) {
            result.push(item);
        }
        test.deepEquals(result, [1, 2, 4, 5]);
        test.end();
    });
    test.end();
});
//# sourceMappingURL=generators.spec.js.map