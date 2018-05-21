"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = require("../maybe");
function maybeMatch(...patterns) {
    return async (val) => {
        const v = await val;
        const predicate = matches(v);
        for (const pattern of patterns) {
            if (await predicate(pattern)) {
                return maybe_1.just(await extract(v, pattern));
            }
        }
        return maybe_1.nothing();
    };
}
exports.maybeMatch = maybeMatch;
function matches(input) {
    return async ([test, _]) => {
        if (typeof test === "function") {
            return await test(input);
        }
        else {
            return test === input;
        }
    };
}
async function extract(input, [_, out]) {
    if (typeof out === "function") {
        return await out(input);
    }
    else {
        return out;
    }
}
//# sourceMappingURL=maybeMatch.js.map