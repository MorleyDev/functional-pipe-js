"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./not"));
__export(require("./and"));
__export(require("./or"));
__export(require("./xor"));
function identity(value) { return value; }
exports.identity = identity;
function val(value) {
    return (...args) => value;
}
exports.val = val;
//# sourceMappingURL=operators.js.map