class GeneratorIterable<T> implements Iterable<T> {
	constructor(private generator: () => Iterable<T>) {
	}

	[Symbol.iterator](): Iterator<T> {
		const result = this.generator();
		return result[Symbol.iterator]();
	}
}

export function range(start: number, count: number): Iterable<number> {
	return new GeneratorIterable(function* () {
		for (let i = 0; i < count; ++i) {
			yield start + i;
		}
	});
}

export function infinite(): Iterable<number> {
	return new GeneratorIterable(function* () {
		for (let i = 0; ; ++i) {
			yield i;
		}
	});
}

export function* empty(): Iterable<any> { }

export function concat<T>(...iterables: Iterable<T>[]): Iterable<T> {
	return new GeneratorIterable(function* () {
		for (const iterable of iterables) {
			yield* iterable;
		}
	});
}

export function keys<T>(item: T): Iterable<string> {
	return new GeneratorIterable(function* () {
		for (const key in item) {
			yield key;
		}
	});
}


export function values<T>(item: T): Iterable<T[keyof T]> {
	return new GeneratorIterable(function* () {
		for (const key in item) {
			yield item[key];
		}
	});
}
