import * as Generators from "./iterable/generators";
import * as Iterables from "./iterable/operators";
import * as MaybeGenerators from "./maybe/generators";
import * as Maybes from "./maybe/operators";
import * as Promises from "./promise/operators";
import * as _Maybe from "./maybe";

import { $$ } from "./pipe";

export type Maybe<T> = _Maybe.Maybe<T>;

const Maybe = {
	..._Maybe,
	...MaybeGenerators
};

export {
	Iterables,
	Generators,
	Promises,
	Maybes,
	Maybe,
	$$
};
