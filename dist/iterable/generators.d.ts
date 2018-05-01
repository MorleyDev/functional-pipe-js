/** Wraps an iterable factory inside a class that allows it to be repeatedly iterated without state, same as how Arrays work */
export declare function defer<T>(func: () => Iterable<T>): Iterable<T>;
/** Yields count numbers from start onwards
 * e.g range(10, 3) will yield [10, 11, 12] */
export declare function range(start: number, count: number, inc?: number): Iterable<number>;
/** Yields an infinite sequence of numbers starting at 0 */
export declare function infinite(): Iterable<number>;
/** Yields the infinite fibonacci sequence (1, 1, 2, 3, 5, 8, 13, etc...) */
export declare function fibonacci(): Iterable<number>;
/** Generate a sequence of primes. Limit that sequence to primes below the specified amount if provided, otherwise generate an infinite sequence of primes
 * (Will become progressively more performance intensive for each prime)
 */
export declare function primes(limit?: number): Iterable<number>;
export declare function empty(): Iterable<any>;
export declare function concat<T>(...iterables: Iterable<T>[]): Iterable<T>;
export declare function keys<T>(item: T): Iterable<string>;
export declare function values<T>(item: T): Iterable<T[keyof T]>;
export declare function zip<T1>(): Iterable<never>;
export declare function zip<T1>(iterable1: Iterable<T1>): Iterable<[T1]>;
export declare function zip<T1, T2>(iterables: Iterable<T1>, iterable2: Iterable<T2>): Iterable<[T1, T2]>;
export declare function zip<T1, T2, T3>(iterables: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>): Iterable<[T1, T2, T3]>;
export declare function zip<T1, T2, T3, T4>(iterables: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>): Iterable<[T1, T2, T3, T4]>;
