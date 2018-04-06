"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.then = (map) => (input) => Promise.resolve(input).then(map);
exports.catchError = (catcher) => (input) => Promise.resolve(input).catch(catcher);
//# sourceMappingURL=operators.js.map