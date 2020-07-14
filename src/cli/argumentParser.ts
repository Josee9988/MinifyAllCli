import arg from "arg";

/**
 * Summary: parseArgumentsIntoOptions receives the raw arguments given by
 * the user and transform them into an object with the options that will be returned.
 *
 * @param rawArgs arguments directly given by the user.
 * @return ArgumentsOptions as a JavaScript object.
 */
export function parseArgumentsIntoOptions(rawArgs: string[]): ArgumentsOptions {
    const args = arg({
        '--help': Boolean,
        '--version': Boolean,
        '--minify-hex': Boolean,
        '--suffix': String,
        '--output': String,
        '--dir': String,
        '-h': '--help',
        '-v': '--version',
        '-m': '--minify-hex',
        '-s': '--suffix',
        '-o': '--output',
        '-d': '--dir',
    }, {
        argv: rawArgs.slice(2),
    });
    return { // return the results parsed
        help: args['--help'] || false,
        version: args['--version'] || false,
        willMinifyHex: args['--minify-hex'] || false,
        suffix: args['--suffix'] || '',
        output: args['--output'] || null,
        directory: args['--dir'] || null,
        file: args._[0] || '',
    };
}

/**
 * Interface used to parse the arguments into options.
 */
export interface ArgumentsOptions {
    /**
     * The help argument will display information about the command and all the other arguments.
     * (ignores any other command)
     */
    help: boolean,
    /**
     * The version argument will display the version of the package. (ignores any other command but help)
     */
    version: boolean,
    /**
     * The will minify hexadecimal values arguments, is a boolean that if it is set to true,
     * (false by default) it will minify hexadecimal and RGB values.
     */
    willMinifyHex: boolean,
    /**
     * The suffix argument allows the user to change the default suffix (default = "-min").
     */
    suffix: string,
    /**
     * The output argument allows the user to specify an specific path (it ignores the suffix).
     */
    output: string | null,
    /**
     * The file argument shows where the file that the user wants to minify is.
     */
    file: string | null;
    /**
     * The directory argument shows if the user wants to look inside a folder recursively
     * looking for .html/.css/.json files to be minified. (it ignores the output argument).
     */
    directory: string | null;
}
