"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybe = Symbol("maybe");
class MaybeImpl {
    constructor(extract) {
        this.extract = extract;
    }
    [exports.maybe]() { return true; }
    [Symbol.iterator]() {
        const self = this;
        let returned = false;
        return {
            next() {
                if (!returned) {
                    returned = true;
                    const result = self.extract();
                    if (result.hasValue) {
                        return {
                            done: false,
                            value: result.value
                        };
                    }
                }
                return { done: true, value: null };
            }
        };
    }
}
exports.just = (value) => new MaybeImpl(() => ({ hasValue: true, value }));
exports.nothing = () => new MaybeImpl(() => ({ hasValue: false }));
exports.infer = (value) => value != null ? exports.just(value) : exports.nothing();
exports.defer = (defer) => {
    return new MaybeImpl(() => {
        for (const result of defer()) {
            return { hasValue: true, value: result };
        }
        return { hasValue: false };
    });
};
//# sourceMappingURL=maybe.js.map