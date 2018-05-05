export * from "./match";

export const then = <T, U>(map: (value: T) => U | Promise<U>) => (input: Promise<T> | T): Promise<U> => Promise.resolve(input).then(map);

export const catchError = <T>(catcher: (reason: any) => T | Promise<T>) => (input: Promise<T> | T): Promise<T> => Promise.resolve(input).catch(catcher);
