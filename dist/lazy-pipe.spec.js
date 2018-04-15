"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lazy_pipe_1 = require("./lazy-pipe");
const tap_1 = require("tap");
tap_1.test("lazy-pipe/$$", test => {
    let invoked = false;
    const intermediate = lazy_pipe_1.$$(() => { invoked = true; return 10; })
        .$(x => x * 4)
        .$((x, y) => (x / y).toString(), 2)
        .$(x => x.charAt(0) + "5")
        .$((x, y, z) => `${z}${x}5${y}`, 10, 50);
    test.false(invoked);
    const result = intermediate.$$(parseInt, 8);
    test.true(invoked);
    test.equal(result, 1321800);
    test.end();
});
//# sourceMappingURL=lazy-pipe.spec.js.map