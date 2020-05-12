import arg from 'arg';
import {showHelp, showVersion} from './informationCLI';

export function startCommand(rawArgs: string[]) {
    const options = parseArgumentsIntoOptions(rawArgs);
    if (!options.help && !options.version) {
        console.log(options);
    } else if (options.help) { // if the user specified help
        showHelp();
    } else if (options.version) { // if the user specified version
        showVersion();
    }
}

/**
 * Summary: parseArgumentsIntoOptions receives the raw arguments given by
 * the user and transform them into an object that will be returned.
 *
 * @param rawArgs arguments directly given by the user.
 * @return options as a JavaScript object.
 */
export function parseArgumentsIntoOptions(rawArgs: string[]) {
    const args = arg({
        '--help': Boolean,
        '--version': Boolean,
        '--minify-hex': Boolean,
        '--suffix': String,
        '--output': String,
        '-h': '--help',
        '-v': '--version',
        '-m': '--minify-hex',
        '-s': '--suffix',
        '-o': '--output',
    }, {
        argv: rawArgs.slice(2),
    });
    return {
        help: args['--help'] || false,
        version: args['--version'] || false,
        minifyHex: args['--minify-hex'] || false,
        suffix: args['--suffix'] || '-min',
        output: args['--output'] || null,
        file: args._[0],
    };
}
