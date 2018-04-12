"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$$ = (x) => ({
    $: (map, ...extra) => exports.$$(map(x, ...extra)),
    $$: (map, ...extra) => map(x, ...extra),
});
;
//# sourceMappingURL=pipe.js.map