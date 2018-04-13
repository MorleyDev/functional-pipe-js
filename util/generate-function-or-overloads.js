console.log(`export function or(...predicates: (() => boolean)[]): () => boolean;`)

const parts = Array(25).fill(0).map((_, index) => [`A${index}`, `a${index}: A${index}`]);
for (let j = 1; j <= 25; ++j) {
	const genericParams = Array(j).fill(0).map((_, index) => parts[index][0]).join(", ");
	const parameterParams = Array(j).fill(0).map((_, index) => parts[index][1]).join(", ");
	console.log(`export function or<${genericParams}>(...predicates: ((${parameterParams}) => boolean)[]): (${parameterParams}) => boolean;`);
}
console.log(`export function or(...predicates: ((...values: any[]) => boolean)[]) {
	return (...values: any[]) => {
		for(const pred of predicates) {
			if (pred(...values)) {
				return true;
			}
		}
		return false;
	}
};`);
