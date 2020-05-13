import Chalk from "chalk";
import {showHelp} from "./informationCLI";

/**
 * Function that displays an error through the console and stops the node process (exits the command).
 *
 * @param code the code to be exited the node process.
 * @param simpleReason a simple reason to output why the process it stopping.
 * @param stackTrace the stacktrace with detailed information about the error.
 */
export function displayException(code: number, simpleReason: string, stackTrace: string): void {
    showHelp();
    console.error(`\n${Chalk.bold.red('ERROR: ')}${simpleReason}.`);
    console.error('If you think this is our mistake, feel free to post an issue at: ' +
        Chalk.bold('https://github.com/Josee9988/MinifyAllCli/issues'));
    console.error(`\n${Chalk.bold.cyan.underline('Node stacktrace')}: \n${stackTrace}`);
    process.exit(code);
}
