"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pipe_1 = require("./pipe");
const tap_1 = require("tap");
tap_1.test("pipe", test => {
    const result = pipe_1.$$(10)
        .$(x => x * 2)
        .$(x => x.toString())
        .$(x => x.charAt(0) + "5")
        .$$(parseFloat);
    test.equal(result, 25);
    test.end();
});
//# sourceMappingURL=pipe.spec.js.map