import { Maybe, just, nothing } from "../maybe";

/** Match the maybe, calling just if there is a value and nothing if not, and return the following value */
export function match<T, U>({ just, nothing }: { just: (value: T) => U; nothing: () => U }): (maybe: Maybe<T>) => U {
	return function (maybe) {
		for (const value of maybe) {
			return just(value);
		}
		return nothing();
	}
}

/** Return a maybe with the current value, if any, mapped to a new Maybe */
export function flatMap<T, U>(mapper: (value: T) => Maybe<U>): (maybe: Maybe<T>) => Maybe<U> {
	return function (maybe) {
		for (const value of maybe) {
			return mapper(value);
		}
		return nothing();
	}
}

/** Return a maybe with the current value, if any, mapped to a new value */
export function map<T, U>(mapper: (value: T) => U): (maybe: Maybe<T>) => Maybe<U> {
	return flatMap(value => just(mapper(value)));
}

/** Return the current maybe if it has a value that matches the predicate, else return an empty */
export function filter<T, U>(predicate: (value: T) => U): (maybe: Maybe<T>) => Maybe<U> {
	return flatMap(value => predicate(value) ? just(value) : nothing());
}

/** Return either the current maybe, or the maybe provided if the current maybe is empty */
export function or<U>(defaultValue: Maybe<U>): <T>(maybe: Maybe<T>) => Maybe<T | U> {
	return function (maybe) {
		for (const value of maybe) {
			return just(value);
		}
		return defaultValue;
	}
}

/** Extract a value from the maybe, either the value of the maybe or the default value provided if the maybe is empty */
export function defaultIfEmpty<U>(defaultValue: U): <T>(maybe: Maybe<T>) => T | U {
	return function (maybe) {
		for (const value of maybe) {
			return value;
		}
		return defaultValue;
	}
}

/** Return true if the maybe is empty, else return false */
export function isEmpty<T>(maybe: Maybe<T>): boolean {
	for (const value of maybe) {
		return false;
	}
	return true;
}
