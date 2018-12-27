export declare function or<T extends any[]>(...predicates: ((...values: T) => boolean)[]): (...values: T) => boolean;
