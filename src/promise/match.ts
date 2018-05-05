
export type Pattern<T, U> = [T | ((val: T) => boolean | Promise<boolean>), U | ((val: T) => Promise<U> | U)]
export type Patterns<T, U> = [T | ((val: T) => boolean | Promise<boolean>), U | ((val: T) => Promise<U> | U)][];
export type DefaultPattern<T, U> = [(val: T) => true | Promise<true>, U | ((val: T) => Promise<U> | U)];

export function match<T, U>(defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, p20: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, p20: Pattern<T, U>, p21: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, p20: Pattern<T, U>, p21: Pattern<T, U>, p22: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, p20: Pattern<T, U>, p21: Pattern<T, U>, p22: Pattern<T, U>, p23: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, p20: Pattern<T, U>, p21: Pattern<T, U>, p22: Pattern<T, U>, p23: Pattern<T, U>, p24: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;

export function match<T, U>(...patterns: Patterns<T, U>): (val: T | Promise<T>) => Promise<U> {
    return async (val) => {
        const v = await val;
        const predicate = matches(v);
        for (const pattern of patterns) {
            if (await predicate(pattern)) {
                return await extract(v, pattern);

            }
        }
        throw new Error(`Pattern match failure: no match found for ${val}`)
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

