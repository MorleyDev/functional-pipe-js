"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = require("../maybe");
/** Match the maybe, calling just if there is a value and nothing if not, and return the following value */
function match({ just, nothing }) {
    return function (maybe) {
        for (const value of maybe) {
            return just(value);
        }
        return nothing();
    };
}
exports.match = match;
/** Return a maybe with the current value, if any, mapped to a new Maybe */
function flatMap(mapper) {
    return function (maybe) {
        for (const value of maybe) {
            return mapper(value);
        }
        return maybe_1.nothing();
    };
}
exports.flatMap = flatMap;
/** Return a maybe with the current value, if any, mapped to a new value */
function map(mapper) {
    return flatMap(value => maybe_1.just(mapper(value)));
}
exports.map = map;
/** Return the current maybe if it has a value that matches the predicate, else return an empty */
function filter(predicate) {
    return flatMap(value => predicate(value) ? maybe_1.just(value) : maybe_1.nothing());
}
exports.filter = filter;
/** Return either the current maybe, or the maybe provided if the current maybe is empty */
function or(defaultValue) {
    return function (maybe) {
        for (const value of maybe) {
            return maybe_1.just(value);
        }
        return defaultValue;
    };
}
exports.or = or;
/** Extract a value from the maybe, either the value of the maybe or the default value provided if the maybe is empty */
function defaultIfEmpty(defaultValue) {
    return function (maybe) {
        for (const value of maybe) {
            return value;
        }
        return defaultValue;
    };
}
exports.defaultIfEmpty = defaultIfEmpty;
/** Return true if the maybe is empty, else return false */
function isEmpty(maybe) {
    for (const value of maybe) {
        return true;
    }
    return false;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=operators.js.map