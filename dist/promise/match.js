"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function match(...patterns) {
    return async (val) => {
        const v = await val;
        const predicate = matches(v);
        for (const pattern of patterns) {
            if (await predicate(pattern)) {
                return await extract(v, pattern);
            }
        }
        throw new Error(`Pattern match failure: no match found for ${val}`);
    };
}
exports.match = match;
function matches(input) {
    return async ([test, _]) => {
        if (typeof test === "function") {
            const func = test;
            return await func(input);
        }
        else {
            return test === input;
        }
    };
}
async function extract(input, [_, out]) {
    if (typeof out === "function") {
        const func = out;
        return await func(input);
    }
    else {
        return out;
    }
}
//# sourceMappingURL=match.js.map