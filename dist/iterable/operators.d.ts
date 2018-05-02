/** Yield the original sequence unmodified */
export declare function identity<T>(iterable: Iterable<T>): Iterable<T>;
/** Yield the original sequence unmodified, calling the tapper on every item in the sequence */
export declare function tap<T>(tapper: (value: T, index: number) => void): (it: Iterable<T>) => Iterable<T>;
/** Yield a new iterable sequence that applies the mapper to every item in the original */
export declare function map<T, U>(mapper: (x: T, index: number) => U): (it: Iterable<T>) => Iterable<U>;
/** Yield all items in every iterable returned by the mapper when applied to every item in the source iterable */
export declare function flatMap<T, U>(mapper: (x: T, index: number) => Iterable<U>): (it: Iterable<T>) => Iterable<U>;
/** Yield only the items in an iterable sequence that match the predicate */
export declare function filter<T>(predicate: (x: T, index: number) => boolean): (it: Iterable<T>) => Iterable<T>;
/** Reduce the items in an iterable down to a single instance of initial type, returning the final result result of the reduction */
export declare function reduce<T, U>(predicate: (prev: U, next: T, index: number) => U, initial: U): (it: Iterable<T>) => U;
/** Reduce the items in an iterable down to a single instance of initial type, yielding each step of the reduction */
export declare function scan<T, U>(predicate: (prev: U, next: T, index: number) => U, initial: U): (it: Iterable<T>) => Iterable<U>;
/** Reduce the items in an iterable down to a single instance of the same type as the type contained by that Iterable */
export declare function fold<T>(predicate: (prev: T, next: T, index: number) => T): (it: Iterable<T>) => T | undefined;
/** Take and yield the first N items in an iterable sequence */
export declare function take(count: number): <T>(iterable: Iterable<T>) => Iterable<T>;
/** Take only the last N items in an iterable sequence */
export declare function takeLast(count: number): <T>(iterable: Iterable<T>) => Iterable<T>;
/** Take everything but the last N items in an iterable sequence */
export declare function skipLast(count: number): <T>(iterable: Iterable<T>) => Iterable<T>;
/** Take only the last item in an iterable sequence */
export declare function last<T>(iterable: Iterable<T>): T | undefined;
/** Take only the first item in an iterable sequence */
export declare function first<T>(iterable: Iterable<T>): T | undefined;
/** Skip the first N items in a iterable sequence, and then yield the remaining items */
export declare function skip(count: number): <T>(iterable: Iterable<T>) => Iterable<T>;
/** Take and yield items in an iterable until the passed predicate fails, then abort the sequence */
export declare function takeWhile<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>;
/** Take and yield items in an iterable until the passed predicate passes, then abort the sequence */
export declare function takeUntil<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>;
/** Skip items in an iterable until the passed predicate fails, then yioeld all items in the iterable */
export declare function skipWhile<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>;
/** Skip items in an iterable until the passed predicate matches, then yioeld all items in the iterable */
export declare function skipUntil<T>(predicate: (item: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>;
/** Enumerate until index and return the element at index, or consumes and return undefined */
export declare function elementAtOrDefault<U>(index: number, or: U): <T>(it: Iterable<T>) => T | U;
/** Yields the passed iterables at the end of the current iterable */
export declare function concat<T>(...iterables: Iterable<T>[]): (it: Iterable<T>) => Iterable<T>;
/** Append an item to the end of an iterable */
export declare function push<T>(...next: T[]): (it: Iterable<T>) => Iterable<T>;
/** Prepend an item to the beginning of an iterable */
export declare function unshift<T>(...next: T[]): (it: Iterable<T>) => Iterable<T>;
/** True if at least one item in a sequence matches the given predicate */
export declare function some<T>(predicate: (item: T, index: number) => boolean): (it: Iterable<T>) => boolean;
/** True if every item in a sequence matches the given predicate */
export declare function every<T>(predicate: (item: T, index: number) => boolean): (it: Iterable<T>) => boolean;
/** Play unique items from a set */
export declare function distinct<T>(it: Iterable<T>): Iterable<T>;
/** Play items from a set, skipping ones that do not change */
export declare function distinctUntilChanged<T>(it: Iterable<T>): Iterable<T>;
/** Play items from a set, skipping ones that do not change */
export declare function distinctUntilKeyChanged<T, U>(keySelector: (value: T) => U): (it: Iterable<T>) => Iterable<T>;
/** Play the given Iterable ordered by a given key or itself */
export declare function orderBy<T, U = T>(keySelector?: (item: T, index: number) => U, comparison?: (a: U, b: U) => number): ((item: Iterable<T>) => Iterable<T>);
/** Play the given Iterable in reverse order */
export declare function flip<T>(it: Iterable<T>): Iterable<T>;
/** Play the given Iterable, and then it N more times */
export declare function repeat<T>(times: number): (it: Iterable<T>) => Iterable<T>;
/** Play the given Iterable, and then play back that Iterable in reverse */
export declare function doppler<T>(it: Iterable<T>): Iterable<T>;
/** Play the given Iterable in a random order */
export declare function shuffle<T>(it: Iterable<T>, rand?: () => number): Iterable<T>;
/** Return the specified iterable if the source iterable is empty */
export declare function or<T>(other: Iterable<T>): (source: Iterable<T>) => Iterable<T>;
/** Evaluate the entire iterable to a readonly array. Provided as type deduction seems to fail when using Array.from to accomplish this outside of a lamda */
export declare function toArray<T>(iterable: Iterable<T>): ReadonlyArray<T>;
/** Replaces the value of an item at the specified index, returning the new iterable set */
export declare function updateAt<T>(index: number, value: T): (source: Iterable<T>) => Iterable<T>;
/** Returns a new iterable set that does not have the element at index */
export declare function removeAt<T>(index: number): (source: Iterable<T>) => Iterable<T>;
