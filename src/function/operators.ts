export * from "./not";
export * from "./and";
export * from "./or";
export * from "./xor";

export function identity<T>(value: T): T { return value; }

export function val<T>(value: T) {
	return (...args: any[]) => value;
}
