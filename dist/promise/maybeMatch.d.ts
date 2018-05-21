import { Patterns } from "./pattern";
import { Maybe } from "../maybe";
export declare function maybeMatch<T, U>(...patterns: Patterns<T, U>): (val: T | Promise<T>) => Promise<Maybe<U>>;
