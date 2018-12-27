export declare const $$: <T>(x: () => T) => Piped<T>;
export interface Piped<T> {
    $<U, A0 extends any[]>(map: (lhs: T, ...a0: A0) => U, ...a0: A0): Piped<U>;
    $$<U, A0 extends any[]>(map: (lhs: T, ...a0: A0) => U, ...a0: A0): U;
}
