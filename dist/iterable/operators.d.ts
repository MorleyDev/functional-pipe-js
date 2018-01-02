export declare function unit<T>(iterable: Iterable<T>): Iterable<T>;
export declare function tap<T>(tapper: (value: T, index: number) => void): (it: Iterable<T>) => Iterable<T>;
export declare function map<T, U>(mapper: (x: T, index: number) => U): (it: Iterable<T>) => Iterable<U>;
export declare function flatMap<T, U>(mapper: (x: T, index: number) => Iterable<U>): (it: Iterable<T>) => Iterable<U>;
export declare function filter<T>(predicate: (x: T, index: number) => boolean): (it: Iterable<T>) => Iterable<T>;
export declare function reduce<T, U>(predicate: (prev: U, next: T, index: number) => U, initial: U): (it: Iterable<T>) => U;
export declare function scan<T, U>(predicate: (prev: U, next: T, index: number) => U, initial: U): (it: Iterable<T>) => Iterable<U>;
export declare function fold<T>(predicate: (prev: T, next: T, index: number) => T): (it: Iterable<T>) => T;
export declare function take(count: number): <T>(iterable: Iterable<T>) => Iterable<T>;
export declare function last<T>(iterable: Iterable<T>): T | undefined;
export declare function first<T>(iterable: Iterable<T>): T | undefined;
export declare function skip(count: number): <T>(iterable: Iterable<T>) => Iterable<T>;
export declare function takeWhile<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>;
export declare function takeUntil<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>;
export declare function skipWhile<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>;
export declare function skipUntil<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>;
export declare function concat<T>(...iterables: Iterable<T>[]): (it: Iterable<T>) => Iterable<T>;
export declare function push<T>(...next: T[]): (it: Iterable<T>) => Iterable<T>;
export declare function unshift<T>(...next: T[]): (it: Iterable<T>) => Iterable<T>;
export declare function some<T>(predicate: (item: T, index: number) => boolean): (it: Iterable<T>) => boolean;
export declare function every<T>(predicate: (item: T, index: number) => boolean): (it: Iterable<T>) => boolean;
export declare function distinct<T>(it: Iterable<T>): Iterable<T>;
export declare function orderBy<T, U = T>(keySelector?: (item: T, index: number) => U, comparison?: (a: U, b: U) => number): ((item: Iterable<T>) => Iterable<T>);
