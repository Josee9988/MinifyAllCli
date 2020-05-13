import fs from 'fs';
import {displayException} from "../cli/displayException";
import Chalk from "chalk";

export function readFileContent(path: string): string[] | null {
    // read file from file system
    fs.readFile(path, (err, data) => {
        if (err) { // error found
            displayException(402, 'could not read file', err.toString());
        }
        return data.toString().split("\n"); // ok
    });
    return null;
}

export function createFile(path: string, content: string, suffix: string): void {
    fs.writeFile(getNewFilePath(path, suffix), content, function (err) {
        if (err) {
            displayException(402, 'could not create new file', err.toString());
        }
        console.log(`${Chalk.bgGreen('SUCCESS!')} You can find your new minified file at: ${Chalk.bold(path)}`);
    });
}

export function getNewFilePath(path: string, suffix: string): string {
    return path.slice(0, path.lastIndexOf('.')) + suffix + path.slice(path.lastIndexOf('.'));
}

