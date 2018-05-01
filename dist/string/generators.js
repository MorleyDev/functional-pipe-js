"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function join(separator = "") {
    return (it) => Array.from(it).join(separator);
}
exports.join = join;
function concat(...strings) {
    return strings.join("");
}
exports.concat = concat;
//# sourceMappingURL=generators.js.map