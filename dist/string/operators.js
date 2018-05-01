"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flip(value) {
    return Array(value.length)
        .fill(0)
        .map((_, index) => value.charAt(value.length - index - 1))
        .join("");
}
exports.flip = flip;
//# sourceMappingURL=operators.js.map