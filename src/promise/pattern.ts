
export type Pattern<T, U> = [T | ((val: T) => boolean) | ((val: T) => Promise<boolean>), U | ((val: T) => U) | ((val: T) => Promise<U>)]
export type Patterns<T, U> = Pattern<T, U>[];
export type DefaultPattern<T, U> = [((val: T) => true) | ((val: T) => Promise<true>), U | ((val: T) => U) | ((val: T) => Promise<U>)];
