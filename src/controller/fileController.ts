import fs from 'fs';
import {displayException} from "../cli/displayException";
import Chalk from "chalk";

export function readFileContent(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", function (err, data) {
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

