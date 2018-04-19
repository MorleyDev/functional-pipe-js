export * from "./not";
export * from "./and";
export * from "./or";
export * from "./xor";
export declare function identity<T>(value: T): T;
export declare function val<T>(value: T): (...args: any[]) => T;
