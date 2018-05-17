
export type Pattern<T, U> = [T | ((val: T) => boolean), U | ((val: T) => U)]
export type Patterns<T, U> = [T | ((val: T) => boolean), U | ((val: T) => U)][];
export type DefaultPattern<T, U> = [(val: T) => true, U | ((val: T) => U)];
