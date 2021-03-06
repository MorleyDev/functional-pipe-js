export function not<T extends any[]>(source: (...args: T) => boolean): (...args: T) => boolean {
	return (...val) => !source(...val);
};
