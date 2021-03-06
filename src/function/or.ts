export function or<T extends any[]>(...predicates: ((...values: T) => boolean)[]) {
	return (...values: T) => {
		for(const pred of predicates) {
			if (pred(...values)) {
				return true;
			}
		}
		return false;
	}
};
