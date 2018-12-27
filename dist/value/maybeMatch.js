"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = require("../maybe");
function maybeMatch(...patterns) {
    return (val) => maybe_1.defer(() => {
        const pattern = patterns.find(matches(val));
        if (pattern == null) {
            return maybe_1.nothing();
        }
        else {
            return maybe_1.just(extract(val, pattern));
        }
    });
}
exports.maybeMatch = maybeMatch;
function matches(input) {
    return ([test, _]) => {
        if (typeof test === "function") {
            const func = test;
            return func(input);
        }
        else {
            return test === input;
        }
    };
}
function extract(input, [_, out]) {
    if (typeof out === "function") {
        const func = out;
        return func(input);
    }
    else {
        return out;
    }
}
//# sourceMappingURL=maybeMatch.js.map