export declare const $$: <T>(x: T) => Piped<T>;
export declare type Piped<T> = {
    readonly $: (<U>(map: (v: T) => U) => Piped<U>);
    readonly $$: () => T;
};
