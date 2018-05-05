"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function match(...patterns) {
    return (val) => {
        const pattern = patterns.find(matches(val));
        if (pattern == null)
            throw new Error(`Pattern match failure: no match found for ${val}`);
        return extract(val, pattern);
    };
}
exports.match = match;
function matches(input) {
    return ([test, _]) => {
        if (typeof test === "function") {
            return test(input);
        }
        else {
            return test === input;
        }
    };
}
function extract(input, [_, out]) {
    if (typeof out === "function") {
        return out(input);
    }
    else {
        return out;
    }
}
//# sourceMappingURL=match.js.map