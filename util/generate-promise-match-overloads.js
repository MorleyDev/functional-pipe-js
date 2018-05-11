console.log(`
export type Pattern<T, U> = [T | ((val: T) => boolean) | ((val: T) => Promise<boolean>), U | ((val: T) => U) | ((val: T) => Promise<U>)]
export type Patterns<T, U> = Pattern<T, U>[];
export type DefaultPattern<T, U> = [((val: T) => true) | ((val: T) => Promise<true>), U | ((val: T) => U) | ((val: T) => Promise<U>)];

export function match<T, U>(defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;`)

const parts = Array(25).fill(0).map((_, index) => [`U${index}`, `p${index}: Pattern<T, U${index}>`]);
for (let j = 1; j <= 25; ++j) {
	const genericParams = Array(j).fill(0).map((_, index) => parts[index][0]).join(", ");
	const resultParams = Array(j).fill(0).map((_, index) => parts[index][0]).join(" | ");
	const parameterParams = Array(j).fill(0).map((_, index) => parts[index][1]).join(", ");
	console.log(`export function match<T, ${genericParams}, U>(${parameterParams}, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<${resultParams} | U>;`);
}

console.log(`
export function match<T, U>(...patterns: Patterns<T, U>): (val: T | Promise<T>) => Promise<U> {
    return async (val) => {
        const v = await val;
        const predicate = matches(v);
        for (const pattern of patterns) {
            if (await predicate(pattern)) {
                return await extract(v, pattern);

            }
        }
        throw new Error(\`Pattern match failure: no match found for \${val}\`);
    }
}
function matches<T, U>(input: T): ([test, _]: Pattern<T, U>) => Promise<boolean> {
    return async ([test, _]) => {
        if (typeof test === "function") {
            return await test(input);
        } else {
            return test === input;
        }
    };
}

async function extract<T, U>(input: T, [_, out]: Pattern<T, U>): Promise<U> {
    if (typeof out === "function") {
        return await out(input);
    } else {
        return out;
    }
}


`);
