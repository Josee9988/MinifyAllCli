import {showHelp, showVersion} from './informationCLI';
import {ArgumentsOptions, parseArgumentsIntoOptions} from "./argumentParser";
import Chalk from 'chalk';

/**
 * First function called when the user executes the CLI command.
 * It receives and parses the arguments and calls the appropriate function
 * to continue with the command execution.
 *
 * @param rawArgs arguments directly given by the user.
 */
export function startCommand(rawArgs: string[]) {
    let options: ArgumentsOptions;
    try{
        options = parseArgumentsIntoOptions(rawArgs);
    }catch (e) { // if the arguments passed are not right
        showHelp();
        console.error(`\n${Chalk.bold.red('ERROR: ')}your arguments: are wrong.`);
        console.error(`\n${Chalk.bold.cyan.underline('Node stacktrace')}: \n${e}`);
    }
    if (!options.help && !options.version) { // OK
        console.log(options);
    } else if (options.help) { // if the user specified help
        showHelp();
    } else if (options.version) { // if the user specified version
        showVersion();
    }
}
