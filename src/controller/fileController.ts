import fs from 'fs';
import {displayException} from "../cli/displayException";
import Chalk from "chalk";
import path from "path";

export function readFileContent(givenPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(givenPath, "utf8", function (err, data) {
            if (err) { // error found
                reject(err);
                displayException(402, 'could not read file', err.toString());
            }
            resolve(data.toString().split("\n"));
        });
    });
}

export function createFile(path: string, content: string, suffix: string): void {
    fs.writeFile(getNewFilePath(path, suffix), content, function (err) {
        if (err) {
            displayException(402, 'could not create new file', err.toString());
        }
        console.log(`\n${Chalk.bgGreen('            ')}\n${Chalk.bgGreen.bold.gray('  SUCCESS!  ')}\n${Chalk.bgGreen('            ')}`);
        console.log(`You can find your new minified file at: ${Chalk.bold.yellow.underline(getNewFilePath(path, suffix))}`);
    });
}

export function getNewFilePath(path: string, suffix: string): string {
    return path.slice(0, path.lastIndexOf('.')) + suffix + path.slice(path.lastIndexOf('.'));
}

/**
 * Find all files recursively in specific folder with specific extension
 *
 * @param startPath path to the folder to find recursively.
 */
export function findFilesInDir(startPath: string): string[] {
    let results: string[] = [];
    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(startPath, files[i]);
        const stat = fs.lstatSync(filename);
        // if it's a directory and it is node_modules and .git
        if (stat.isDirectory() && !filename.match(/node_modules/g) && !filename.match(/.git/g)) {
                results = results.concat(findFilesInDir(filename)); // recurse
        } else if (filename.indexOf('.html') >= 0 || filename.indexOf('.css') >= 0 || filename.indexOf('.json') >= 0) {
            results.push(filename);
        }
    }
    return results;
}
