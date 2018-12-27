export function xor<T extends any[]> (...predicates: ((...values: T) => boolean)[]) {
	return (...values: T) => {
		let hasTrued = false;
		for(const pred of predicates) {
			if (pred(...values)) {
				if (hasTrued) {
					return false;
				} else {
					hasTrued = true;
				}
			}
		}
		return hasTrued;
	}
};
