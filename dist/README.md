# Functional Pipe JS

A ponyfill for the proposed Pipeline operator |> alongside utility Iterable mapreduce operations.

Example usage:

```js
import { $$, Iterables, Generators } from "pipe";

const values = $$(Generators.infinite())
	.$(Iterables.skip(10))
	.$(Iterables.map(x => x ** 2))
	.$(Iterables.take(5))
	.$(Iterables.tap(value => console.log(value)))
	.$(Array.from)
	.$$();
```