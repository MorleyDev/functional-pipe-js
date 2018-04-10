import { Maybe, defer, just, nothing } from "../maybe";

export function find<T>(predicate: (value: T) => boolean): (it: Iterable<T>) => Maybe<T> {
	return function (it) {
		for (const item of it) {
			if (predicate(item)) {
				return just(item);
			}
		}
		return nothing();
	}
}

export function first<T>(it: Iterable<T>): Maybe<T> {
	for (const item of it) {
		return just(item);
	}
	return nothing();
}

export function last<T>(it: Iterable<T>): Maybe<T> {
	let empty = true;
	let last: T | undefined = undefined;
	for (const item of it) {
		empty = false;
		last = item;
	}
	return empty
		? nothing()
		: just(last!);
}

export function elementAt<T>(index: number): (it: Iterable<T>) => Maybe<T> {
	return function (it) {
		for (const item of it) {
			if (index === 0) {
				return just(item);
			}
			index = index - 1;
		}
		return nothing();
	}
}
