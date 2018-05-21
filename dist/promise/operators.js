"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./match"));
__export(require("./maybeMatch"));
exports.then = (map) => (input) => Promise.resolve(input).then(map);
exports.catchError = (catcher) => (input) => Promise.resolve(input).catch(catcher);
//# sourceMappingURL=operators.js.map