export declare function xor<T extends any[]>(...predicates: ((...values: T) => boolean)[]): (...values: T) => boolean;
