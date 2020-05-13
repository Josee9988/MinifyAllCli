import arg from "arg";

/**
 * Interface used to parse the arguments into options.
 */
export interface ArgumentsOptions {
    help: boolean,
    version: boolean,
    minifyHex: boolean,
    suffix: string,
    output: string | null,
    file: string | null;
}

/**
 * Summary: parseArgumentsIntoOptions receives the raw arguments given by
 * the user and transform them into an object that will be returned.
 *
 * @param rawArgs arguments directly given by the user.
 * @return options as a JavaScript object.
 */
export function parseArgumentsIntoOptions(rawArgs: string[]): ArgumentsOptions {
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
    return { // return the results parsed
        help: args['--help'] || false,
        version: args['--version'] || false,
        minifyHex: args['--minify-hex'] || false,
        suffix: args['--suffix'] || '-min',
        output: args['--output'] || null,
        file: args._[0],
    };
}
