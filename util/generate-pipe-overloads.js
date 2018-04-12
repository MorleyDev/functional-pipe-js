console.log(`export const $$ = <T>(x: T): Piped<T> => ({
	$: <U>(map: (v: T) => U, ...extra: any[]) => $$(map(x, ...extra)),
	$$: <U>(map: (v: T) => U,  ...extra: any[]) => map(x, ...extra),
}) as any;

export interface Piped<T> {
	$<U>(map: (lhs: T) => U): Piped<U>;
	$$<U>(map: (lhs: T) => U): U;
	`);

const parts = Array(25).fill(0).map((_, index) => [`A${index}`, `a${index}: A${index}`]);
for (let j = 1; j <= 25; ++j) {
	const genericParams = Array(j).fill(0).map((_, index) => parts[index][0]).join(", ");
	const parameterParams = Array(j).fill(0).map((_, index) => parts[index][1]).join(", ");
	console.log(`	$<U, ${genericParams}>(map: (lhs: T, ${parameterParams}) => U, ${parameterParams}): Piped<U>;`);
	console.log(`	$$<U, ${genericParams}>(map: (lhs: T, ${parameterParams}) => U, ${parameterParams}): U;`);
}


console.log(`
};
`);

