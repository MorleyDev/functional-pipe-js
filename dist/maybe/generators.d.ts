import { Maybe } from "../maybe";
export declare function find<T>(predicate: (value: T) => boolean): (it: Iterable<T>) => Maybe<T>;
export declare function maybeIf<T>(predicate: (v: T) => boolean): (value: T) => Maybe<T>;
export declare function first<T>(it: Iterable<T>): Maybe<T>;
export declare function last<T>(it: Iterable<T>): Maybe<T>;
export declare function elementAt<T>(index: number): (it: Iterable<T>) => Maybe<T>;
