import * as Generators from "./iterable/generators";
import * as Iterables from "./iterable/operators";
import * as Maybes from "./maybe/operators";
import * as Promises from "./promise/operators";
import * as _Maybe from "./maybe";
import { $$ } from "./pipe";
export declare type Maybe<T> = _Maybe.Maybe<T>;
export declare const Maybe: {
    find<T>(predicate: (value: T) => boolean): (it: Iterable<T>) => _Maybe.Maybe<T>;
    maybeIf<T>(predicate: (v: T) => boolean): (value: T) => _Maybe.Maybe<T>;
    first<T>(it: Iterable<T>): _Maybe.Maybe<T>;
    last<T>(it: Iterable<T>): _Maybe.Maybe<T>;
    elementAt<T>(index: number): (it: Iterable<T>) => _Maybe.Maybe<T>;
    just: <T>(value: T) => _Maybe.Maybe<T>;
    nothing: () => _Maybe.Maybe<any>;
    infer: <T>(value: T | null | undefined) => _Maybe.Maybe<T>;
    defer: <T>(defer: () => _Maybe.Maybe<T>) => _Maybe.Maybe<T>;
};
export { Iterables, Generators, Promises, Maybes, $$ };
