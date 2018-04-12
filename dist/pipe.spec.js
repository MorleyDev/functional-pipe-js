"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pipe_1 = require("./pipe");
const tap_1 = require("tap");
tap_1.test("pipe/$$", test => {
    const result = pipe_1.$$(10)
        .$(x => x * 4)
        .$((x, y) => (x / y).toString(), 2)
        .$(x => x.charAt(0) + "5")
        .$((x, y, z) => `${z}${x}5${y}`, 10, 50)
        .$$(parseInt, 8);
    test.equal(result, 1321800);
    test.end();
});
//# sourceMappingURL=pipe.spec.js.map