"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function or(...predicates) {
    return (...values) => {
        for (const pred of predicates) {
            if (pred(...values)) {
                return true;
            }
        }
        return false;
    };
}
exports.or = or;
;
//# sourceMappingURL=or.js.map