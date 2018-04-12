# Functional Pipe JS

A ponyfill for the proposed Pipeline operator |> alongside utility Iterable mapreduce operations and a Maybe Monad that has pipeable operators.

Example usage:

```js
import { $$, Iterables, Generators } from "@morleydev/functional-pipe";

const values = $$(Generators.infinite())
	.$(Iterables.skip(10))
	.$(Iterables.map(x => x ** 2))
	.$(Iterables.take(5))
	.$(Iterables.tap(value => console.log(value)))
	.$$(Iterables.toArray);

// Loadash example using rhs application
const values = $$(Generators.range(0, 10))
	.$(Iterables.toArray)
	.$(_.map, x => x + 5)
	.$$(_.map, x => x * 2);

```
