import fs from 'fs';
import {displayException} from "../cli/displayException";
import Chalk from "chalk";
import path from "path";

export function readFileContent(givenPath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(givenPath, "utf8", (err, data) => {
            if (err) { // error found
                reject(err);
                displayException(402, 'could not read file', err.toString());
            }
            resolve(data.toString().split("\n"));
        });
    });
}

export function createFile(givenPath: string, content: string, suffix: string): void {
    fs.writeFile(getNewFilePath(givenPath, suffix), content, err => {
        if (err) {
            displayException(402, 'could not create new file', err.toString());
        }
        console.log(`${Chalk.bgGreen.bold.gray('SUCCESS!')}`);
        console.log(`You can find your new minified file at: ${Chalk.bold.yellow.underline(getNewFilePath(givenPath, suffix))}\n`);
    });
}

export function getNewFilePath(givenPath: string, suffix: string): string {
    return givenPath.slice(0, givenPath.lastIndexOf('.')) + suffix + givenPath.slice(givenPath.lastIndexOf('.'));
}

/**
 * Find all files recursively in specific folder with specific extension
 *
 * @param startPath path to the folder to find recursively.
 */
export function findFilesInDir(startPath: string): string[] {
    let results: string[] = [];
    const files = fs.readdirSync(startPath);
    for (const file of files) {
        const filename = path.join(startPath, file);
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
