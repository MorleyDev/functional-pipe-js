console.log(`
export type Pattern<T, U> = [T | ((val: T) => boolean), U | ((val: T) => U)]
export type Patterns<T, U> = [T | ((val: T) => boolean), U | ((val: T) => U)][];
export type DefaultPattern<T, U> = [(val: T) => true, U | ((val: T) => U)];

export function match<T, U>(defaultValue: DefaultPattern<T, U>): (val: T) => U;`)

const parts = Array(25).fill(0).map((_, index) => `p${index}: Pattern<T, U>`);
for (let j = 1; j <= 25; ++j) {
	const parameterParams = Array(j).fill(0).map((_, index) => parts[index]).join(", ");
	console.log(`export function match<T, U>(${parameterParams}, defaultValue: DefaultPattern<T, U>): (val: T) => U;`);
}
console.log(`
export function match<T, U>(...patterns: Patterns<T, U>): (val: T) => U {
    return (val) => {
        const pattern = patterns.find(matches(val));
        if (pattern == null)
            throw new Error(\`Pattern match failure: no match found for \${val}\`)
        return extract(val, pattern);
    }
}
function matches<T, U>(input: T): ([test, _]: Pattern<T, U>) => boolean {
    return ([test, _]) => {
        if (typeof test === "function") {
            return test(input);
        } else {
            return test === input;
        }
    };
}

function extract<T, U>(input: T, [_, out]: Pattern<T, U>): U {
    if (typeof out === "function") {
        return out(input);
    } else {
        return out;
    }
}
`);
