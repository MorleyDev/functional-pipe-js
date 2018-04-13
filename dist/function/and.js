"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function and(...predicates) {
    return (...values) => {
        for (const pred of predicates) {
            if (!pred(...values)) {
                return false;
            }
        }
        return true;
    };
}
exports.and = and;
;
//# sourceMappingURL=and.js.map