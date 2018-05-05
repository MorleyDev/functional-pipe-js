export * from "./match";
export declare const then: <T, U>(map: (value: T) => U | Promise<U>) => (input: T | Promise<T>) => Promise<U>;
export declare const catchError: <T>(catcher: (reason: any) => T | Promise<T>) => (input: T | Promise<T>) => Promise<T>;
