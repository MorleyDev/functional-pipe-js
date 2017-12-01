export const $$ = <T>(x: T): Piped<T> => ({
	$: <U>(map: (v: T) => U) => $$(map(x)),
	$$: <U>(map: (v: T) => U) => map(x),
});

export type Piped<T> = {
	readonly $: <U>(map: (v: T) => U) => Piped<U>;
	readonly $$: <U>(map: (v: T) => U) => U;
};
