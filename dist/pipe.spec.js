"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("./iterable/operators");
const pipe_1 = require("./pipe");
const tap_1 = require("tap");
tap_1.test("pipe", test => {
    const result = pipe_1.$$(10)
        .$(x => x * 2)
        .$(x => x.toString())
        .$(x => x.charAt(0) + "5")
        .$(x => Array.from(x))
        .$(operators_1.map(x => parseInt(x)))
        .$(operators_1.toArray)
        .$(x => x.reduce((l, r) => `${l}${r}`, ""))
        .$$(parseFloat);
    test.equal(result, 25);
    test.end();
});
//# sourceMappingURL=pipe.spec.js.map