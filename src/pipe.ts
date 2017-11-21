export const $$ = <T>(x: T): Piped<T> => ({
	$: <U>(map: (v: T) => U) => $$(map(x)),
	$$: () => x
});

export type Piped<T> = {
	readonly $: (<U>(map: (v: T) => U) => Piped<U>);
	readonly $$: () => T;
};
