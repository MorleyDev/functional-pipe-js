"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = require("../maybe");
function find(predicate) {
    return function (it) {
        for (const item of it) {
            if (predicate(item)) {
                return maybe_1.just(item);
            }
        }
        return maybe_1.nothing();
    };
}
exports.find = find;
function maybeIf(predicate) {
    return value => predicate(value) ? maybe_1.just(value) : maybe_1.nothing();
}
exports.maybeIf = maybeIf;
function first(it) {
    for (const item of it) {
        return maybe_1.just(item);
    }
    return maybe_1.nothing();
}
exports.first = first;
function last(it) {
    let empty = true;
    let last = undefined;
    for (const item of it) {
        empty = false;
        last = item;
    }
    return empty
        ? maybe_1.nothing()
        : maybe_1.just(last);
}
exports.last = last;
function elementAt(index) {
    return function (it) {
        for (const item of it) {
            if (index === 0) {
                return maybe_1.just(item);
            }
            index = index - 1;
        }
        return maybe_1.nothing();
    };
}
exports.elementAt = elementAt;
//# sourceMappingURL=generators.js.map