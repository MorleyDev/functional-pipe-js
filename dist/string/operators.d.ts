/** Flip a string (e.g abc becomes cba) */
export declare function flip(value: string): string;
/** Get a substring with max length count from startIndex */
export declare function substr(startIndex: number, count: number): (value: string) => string;
/** Get the character at a given index */
export declare function charAt(index: number): (value: string) => string | undefined;
/** Replace all instances in a string that match a given string or regular expression */
export declare function replace(target: string | RegExp, replaceWith: string): (value: string) => string;
