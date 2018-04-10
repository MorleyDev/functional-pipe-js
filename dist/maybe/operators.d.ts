import { Maybe } from "../maybe";
/** Match the maybe, calling just if there is a value and nothing if not, and return the following value */
export declare function match<T, U>({just, nothing}: {
    just: (value: T) => U;
    nothing: () => U;
}): (maybe: Maybe<T>) => U;
/** Return a maybe with the current value, if any, mapped to a new Maybe */
export declare function flatMap<T, U>(mapper: (value: T) => Maybe<U>): (maybe: Maybe<T>) => Maybe<U>;
/** Return a maybe with the current value, if any, mapped to a new value */
export declare function map<T, U>(mapper: (value: T) => U): (maybe: Maybe<T>) => Maybe<U>;
/** Return the current maybe if it has a value that matches the predicate, else return an empty */
export declare function filter<T, U>(predicate: (value: T) => U): (maybe: Maybe<T>) => Maybe<U>;
/** Return either the current maybe, or the maybe provided if the current maybe is empty */
export declare function or<U>(defaultValue: Maybe<U>): <T>(maybe: Maybe<T>) => Maybe<T | U>;
/** Extract a value from the maybe, either the value of the maybe or the default value provided if the maybe is empty */
export declare function defaultIfEmpty<U>(defaultValue: U): <T>(maybe: Maybe<T>) => T | U;
/** Return true if the maybe is empty, else return false */
export declare function isEmpty<T>(maybe: Maybe<T>): boolean;
