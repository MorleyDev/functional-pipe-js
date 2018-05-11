
export type Pattern<T, U> = [T | ((val: T) => boolean) | ((val: T) => Promise<boolean>), U | ((val: T) => U) | ((val: T) => Promise<U>)]
export type Patterns<T, U> = Pattern<T, U>[];
export type DefaultPattern<T, U> = [((val: T) => true) | ((val: T) => Promise<true>), U | ((val: T) => U) | ((val: T) => Promise<U>)];

export function match<T, U>(defaultValue: DefaultPattern<T, U>): (val: T | Promise<T>) => Promise<U>;
export function match<T, U0, U>(p0: Pattern<T, U0>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U>;
export function match<T, U0, U1, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U>;
export function match<T, U0, U1, U2, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U>;
export function match<T, U0, U1, U2, U3, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U>;
export function match<T, U0, U1, U2, U3, U4, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, p15: Pattern<T, U15>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U15 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, p15: Pattern<T, U15>, p16: Pattern<T, U16>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U15 | U16 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U17, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, p15: Pattern<T, U15>, p16: Pattern<T, U16>, p17: Pattern<T, U17>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U15 | U16 | U17 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U17, U18, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, p15: Pattern<T, U15>, p16: Pattern<T, U16>, p17: Pattern<T, U17>, p18: Pattern<T, U18>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U15 | U16 | U17 | U18 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U17, U18, U19, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, p15: Pattern<T, U15>, p16: Pattern<T, U16>, p17: Pattern<T, U17>, p18: Pattern<T, U18>, p19: Pattern<T, U19>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U15 | U16 | U17 | U18 | U19 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U17, U18, U19, U20, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, p15: Pattern<T, U15>, p16: Pattern<T, U16>, p17: Pattern<T, U17>, p18: Pattern<T, U18>, p19: Pattern<T, U19>, p20: Pattern<T, U20>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U15 | U16 | U17 | U18 | U19 | U20 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U17, U18, U19, U20, U21, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, p15: Pattern<T, U15>, p16: Pattern<T, U16>, p17: Pattern<T, U17>, p18: Pattern<T, U18>, p19: Pattern<T, U19>, p20: Pattern<T, U20>, p21: Pattern<T, U21>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U15 | U16 | U17 | U18 | U19 | U20 | U21 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U17, U18, U19, U20, U21, U22, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, p15: Pattern<T, U15>, p16: Pattern<T, U16>, p17: Pattern<T, U17>, p18: Pattern<T, U18>, p19: Pattern<T, U19>, p20: Pattern<T, U20>, p21: Pattern<T, U21>, p22: Pattern<T, U22>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U15 | U16 | U17 | U18 | U19 | U20 | U21 | U22 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U17, U18, U19, U20, U21, U22, U23, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, p15: Pattern<T, U15>, p16: Pattern<T, U16>, p17: Pattern<T, U17>, p18: Pattern<T, U18>, p19: Pattern<T, U19>, p20: Pattern<T, U20>, p21: Pattern<T, U21>, p22: Pattern<T, U22>, p23: Pattern<T, U23>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U15 | U16 | U17 | U18 | U19 | U20 | U21 | U22 | U23 | U>;
export function match<T, U0, U1, U2, U3, U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U17, U18, U19, U20, U21, U22, U23, U24, U>(p0: Pattern<T, U0>, p1: Pattern<T, U1>, p2: Pattern<T, U2>, p3: Pattern<T, U3>, p4: Pattern<T, U4>, p5: Pattern<T, U5>, p6: Pattern<T, U6>, p7: Pattern<T, U7>, p8: Pattern<T, U8>, p9: Pattern<T, U9>, p10: Pattern<T, U10>, p11: Pattern<T, U11>, p12: Pattern<T, U12>, p13: Pattern<T, U13>, p14: Pattern<T, U14>, p15: Pattern<T, U15>, p16: Pattern<T, U16>, p17: Pattern<T, U17>, p18: Pattern<T, U18>, p19: Pattern<T, U19>, p20: Pattern<T, U20>, p21: Pattern<T, U21>, p22: Pattern<T, U22>, p23: Pattern<T, U23>, p24: Pattern<T, U24>, defaultValue: DefaultPattern<T, U | Promise<U>>): (val: T | Promise<T>) => Promise<U0 | U1 | U2 | U3 | U4 | U5 | U6 | U7 | U8 | U9 | U10 | U11 | U12 | U13 | U14 | U15 | U16 | U17 | U18 | U19 | U20 | U21 | U22 | U23 | U24 | U>;

export function match<T, U>(...patterns: Patterns<T, U>): (val: T | Promise<T>) => Promise<U> {
    return async (val) => {
        const v = await val;
        const predicate = matches(v);
        for (const pattern of patterns) {
            if (await predicate(pattern)) {
                return await extract(v, pattern);

            }
        }
        throw new Error(`Pattern match failure: no match found for ${val}`);
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



