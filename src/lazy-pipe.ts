export const $$ = <T>(x: () => T): Piped<T> => ({
	$: <U>(map: (v: T, ...extra: any[]) => U, ...extra: any[]) => $$(() => map(x(), ...extra)),
	$$: <U>(map: (v: T, ...extra: any[]) => U,  ...extra: any[]) => map(x(), ...extra),
}) as any;

export interface Piped<T> {
	$<U, A0 extends any[]>(map: (lhs: T, ...a0: A0) => U, ...a0: A0): Piped<U>;
	$$<U, A0 extends any[]>(map: (lhs: T, ...a0: A0) => U, ...a0: A0): U;
};

