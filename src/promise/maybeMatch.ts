import { Maybe, just, nothing } from "../maybe";
import { Pattern, Patterns } from "./pattern";

export function maybeMatch<T, U>(...patterns: Patterns<T, U>): (val: T | Promise<T>) => Promise<Maybe<U>> {
	return async (val) => {
		const v = await val;
		const predicate = matches(v);
		for (const pattern of patterns) {
			if (await predicate(pattern)) {
				return just(await extract(v, pattern));
			}
		}
		return nothing();
	}
}
function matches<T, U>(input: T): ([test, _]: Pattern<T, U>) => Promise<boolean> {
	return async ([test, _]) => {
		if (typeof test === "function") {
			const func = test as any;
			return await func(input);
		} else {
			return test === input;
		}
	};
}

async function extract<T, U>(input: T, [_, out]: Pattern<T, U>): Promise<U> {
	if (typeof out === "function") {
		const func = out as any;
		return await func(input);
	} else {
		return out;
	}
}



