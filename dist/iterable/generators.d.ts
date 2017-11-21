export declare function range(start: number, count: number): Iterable<number>;
export declare function infinite(): Iterable<number>;
export declare function empty(): Iterable<any>;
export declare function concat<T>(...iterables: Iterable<T>[]): Iterable<T>;
export declare function keys<T>(item: T): Iterable<string>;
