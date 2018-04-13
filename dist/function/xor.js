"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function xor(...predicates) {
    return (...values) => {
        let hasTrued = false;
        for (const pred of predicates) {
            if (pred(...values)) {
                if (hasTrued) {
                    return false;
                }
                else {
                    hasTrued = true;
                }
            }
        }
        return hasTrued;
    };
}
exports.xor = xor;
;
//# sourceMappingURL=xor.js.map