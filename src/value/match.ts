
export type Pattern<T, U> = [T | ((val: T) => boolean), U | ((val: T) => U)]
export type Patterns<T, U> = [T | ((val: T) => boolean), U | ((val: T) => U)][];
export type DefaultPattern<T, U> = [(val: T) => true, U | ((val: T) => U)];

export function match<T, U>(defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, p20: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, p20: Pattern<T, U>, p21: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, p20: Pattern<T, U>, p21: Pattern<T, U>, p22: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, p20: Pattern<T, U>, p21: Pattern<T, U>, p22: Pattern<T, U>, p23: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;
export function match<T, U>(p0: Pattern<T, U>, p1: Pattern<T, U>, p2: Pattern<T, U>, p3: Pattern<T, U>, p4: Pattern<T, U>, p5: Pattern<T, U>, p6: Pattern<T, U>, p7: Pattern<T, U>, p8: Pattern<T, U>, p9: Pattern<T, U>, p10: Pattern<T, U>, p11: Pattern<T, U>, p12: Pattern<T, U>, p13: Pattern<T, U>, p14: Pattern<T, U>, p15: Pattern<T, U>, p16: Pattern<T, U>, p17: Pattern<T, U>, p18: Pattern<T, U>, p19: Pattern<T, U>, p20: Pattern<T, U>, p21: Pattern<T, U>, p22: Pattern<T, U>, p23: Pattern<T, U>, p24: Pattern<T, U>, defaultValue: DefaultPattern<T, U>): (val: T) => U;

/** value against the provided patterns */
export function match<T, U>(...patterns: Patterns<T, U>): (val: T) => U {
    return (val) => {
        const pattern = patterns.find(matches(val));
        if (pattern == null)
            throw new Error(`Pattern match failure: no match found for ${val}`)
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

