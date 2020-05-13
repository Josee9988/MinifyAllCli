import Chalk from "chalk";
import {showHelp} from "./informationCLI";

export function displayException(code: number, simpleReason:string, stackTrace: string){
    showHelp();
    console.error(`\n${Chalk.bold.red('ERROR: ')}${simpleReason}.`);
    console.error(`\n${Chalk.bold.cyan.underline('Node stacktrace')}: \n${stackTrace}`);
    process.exit(code);
}
