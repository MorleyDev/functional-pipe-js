import { Maybe, defer, just, nothing } from "../maybe";
import { Pattern, Patterns } from "./pattern";

export function maybeMatch<T, U>(...patterns: Patterns<T, U>): (val: T) => Maybe<U> {
	return (val) => defer(() => {
		const pattern = patterns.find(matches(val));
		if (pattern == null) {
			return nothing();
		} else {
			return just(extract(val, pattern));
		}
	});
}

function matches<T, U>(input: T): ([test, _]: Pattern<T, U>) => boolean {
	return ([test, _]) => {
		if (typeof test === "function") {
			const func = test as any;
			return func(input);
		} else {
			return test === input;
		}
	};
}

function extract<T, U>(input: T, [_, out]: Pattern<T, U>): U {
	if (typeof out === "function") {
		const func = out as any;
		return func(input);
	} else {
		return out;
	}
}
