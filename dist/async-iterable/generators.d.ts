export declare function from<T>(it: Iterable<T>): AsyncIterable<T>;
export declare function defer<T>(func: () => AsyncIterable<T>): AsyncIterable<T>;
