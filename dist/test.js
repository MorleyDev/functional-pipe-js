"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
importTestsIn(__dirname).catch(err => console.error(err));
async function importTestsIn(path) {
    const testFiles = findTestsIn(path);
    const importTests = testFiles.map(testPath => Promise.resolve().then(() => require(testPath)));
    return await Promise.all(importTests);
}
function findTestsIn(path) {
    return fs_1.readdirSync(path)
        .map(item => path_1.join(path, item))
        .map(item => ({ stat: fs_1.statSync(item), fullpath: item }))
        .map(item => item.stat.isDirectory() ? findTestsIn(item.fullpath) : item.fullpath)
        .map(item => Array.isArray(item) ? item : [item])
        .reduce((prev, curr) => prev.concat(curr), [])
        .filter(item => item.match(/^.+\.spec\.(j|t)sx?$/));
}
//# sourceMappingURL=test.js.map