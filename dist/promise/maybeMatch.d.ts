import { Maybe } from "../maybe";
import { Patterns } from "./pattern";
export declare function maybeMatch<T, U>(...patterns: Patterns<T, U>): (val: T | Promise<T>) => Promise<Maybe<U>>;
