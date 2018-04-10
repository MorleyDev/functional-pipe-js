import * as Generators from "./iterable/generators";
import * as Iterables from "./iterable/operators";
import * as Maybe from "./maybe";
import * as Maybes from "./maybe/operators";
import * as Promises from "./promise/operators";

import { $$ } from "./pipe";

export {
	Iterables,
	Generators,
	Promises,
	Maybes,
	Maybe,
	$$
};
export type Maybe<T> = Maybe.Maybe<T>;
