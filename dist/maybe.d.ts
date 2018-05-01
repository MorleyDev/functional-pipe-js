export declare const maybe: unique symbol;
export declare type Maybe<T> = {
    [maybe](): boolean;
    [Symbol.iterator](): Iterator<T>;
};
export declare const just: <T>(value: T) => Maybe<T>;
export declare const nothing: () => Maybe<any>;
export declare const infer: <T>(value: T | null | undefined) => Maybe<T>;
export declare const defer: <T>(defer: () => Maybe<T>) => Maybe<T>;
