"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flip(value) {
    return value.split("").reverse().join("");
}
exports.flip = flip;
function substr(startIndex, count) {
    return value => value.substr(startIndex, count);
}
exports.substr = substr;
//# sourceMappingURL=operators.js.map