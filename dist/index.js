(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./pipe/iterable/operators", "./pipe/iterable/generators", "./pipe"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Iterables = require("./pipe/iterable/operators");
    exports.Iterables = Iterables;
    const Generators = require("./pipe/iterable/generators");
    exports.Generators = Generators;
    const pipe_1 = require("./pipe");
    exports.$$ = pipe_1.$$;
});
//# sourceMappingURL=index.js.map