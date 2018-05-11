"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Flip a string (e.g abc becomes cba) */
function flip(value) {
    return value.split("").reverse().join("");
}
exports.flip = flip;
/** Get a substring with max length count from startIndex */
function substr(startIndex, count) {
    return value => value.substr(startIndex, count);
}
exports.substr = substr;
/** Get the character at a given index */
function charAt(index) {
    return value => value.length <= index ? undefined : value.charAt(index);
}
exports.charAt = charAt;
/** Replace all instances in a string that match a given string or regular expression */
function replace(target, replaceWith) {
    function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }
    return target instanceof RegExp
        ? value => value.replace(target, replaceWith)
        : replace(new RegExp(escapeRegExp(target), "g"), replaceWith);
}
exports.replace = replace;
//# sourceMappingURL=operators.js.map