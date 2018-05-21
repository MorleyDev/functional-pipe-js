export declare type Pattern<T, U> = [T | ((val: T) => boolean) | ((val: T) => Promise<boolean>), U | ((val: T) => U) | ((val: T) => Promise<U>)];
export declare type Patterns<T, U> = Pattern<T, U>[];
export declare type DefaultPattern<T, U> = [((val: T) => true) | ((val: T) => Promise<true>), U | ((val: T) => U) | ((val: T) => Promise<U>)];
