export declare function flip(value: string): string;
export declare function substr(startIndex: number, count: number): (value: string) => string;
export declare function charAt(index: number): (value: string) => string | undefined;
/** Replace all instances in a string that match a given string or regular expression */
export declare function replace(target: string | RegExp, replaceWith: string): (value: string) => string;
