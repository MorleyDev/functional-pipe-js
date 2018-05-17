export declare type Pattern<T, U> = [T | ((val: T) => boolean), U | ((val: T) => U)];
export declare type Patterns<T, U> = [T | ((val: T) => boolean), U | ((val: T) => U)][];
export declare type DefaultPattern<T, U> = [(val: T) => true, U | ((val: T) => U)];
