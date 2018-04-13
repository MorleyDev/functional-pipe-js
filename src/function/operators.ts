export * from "./not";
export * from "./or";
export * from "./and";

export function unit<T>(value: T): T { return value; }
