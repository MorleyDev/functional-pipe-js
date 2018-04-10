"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Generators = require("./iterable/generators");
exports.Generators = Generators;
const Iterables = require("./iterable/operators");
exports.Iterables = Iterables;
const MaybeGenerators = require("./maybe/generators");
const Maybes = require("./maybe/operators");
exports.Maybes = Maybes;
const Promises = require("./promise/operators");
exports.Promises = Promises;
const _Maybe = require("./maybe");
const pipe_1 = require("./pipe");
exports.$$ = pipe_1.$$;
const Maybe = Object.assign({}, _Maybe, MaybeGenerators);
exports.Maybe = Maybe;
//# sourceMappingURL=index.js.map