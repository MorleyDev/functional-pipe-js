import { readdirSync, statSync } from "fs";

import { join } from "path";

(Symbol as any).asyncIterator = Symbol.asyncIterator || Symbol.for("Symbol.asyncIterator");

const filterArg = process.argv.find(f => f.startsWith("--filter="));
const filter = filterArg != null
	? (fullPath: string) => {
		const [_, ...filterPath] = filterArg.split("=");
		return fullPath.includes(filterPath.join("="));
	}
	: (fullPath: string) => true

importTestsIn(__dirname).catch(err => console.error(err));

async function importTestsIn(path: string): Promise<any[]> {
	const testFiles = findTestsIn(path);
	const importTests = testFiles.map(testPath => import(testPath));

	return await Promise.all(importTests);
}

function findTestsIn(path: string): string[] {
	return readdirSync(path)
		.map(item => join(path, item))
		.map(item => ({ stat: statSync(item), fullpath: item }))
		.map(item => item.stat.isDirectory() ? findTestsIn(item.fullpath) : item.fullpath)
		.map(item => Array.isArray(item) ? item : [item])
		.reduce((prev, curr) => prev.concat(curr), [])
		.filter(item => filter(item))
		.filter(item => item.match(/^.+\.spec\.(j|t)sx?$/));
}
