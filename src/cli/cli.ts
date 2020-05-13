import {showHelp, showVersion} from './informationCLI';
import {ArgumentsOptions, parseArgumentsIntoOptions} from "./argumentParser";
import {createFile, findFilesInDir, readFileContent} from "../controller/fileController";
import {displayException} from "./displayException";
import {detectLanguageAndMinify} from "../index";

/**
 * First function called when the user executes the CLI command.
 * It receives and parses the arguments and calls the appropriate function
 * to continue with the command execution.
 *
 * @param rawArgs arguments directly given by the user.
 */
export async function startCommand(rawArgs: string[]): Promise<void> {
    let options: ArgumentsOptions;
    try {
        options = parseArgumentsIntoOptions(rawArgs);
    } catch (e) { // if the arguments passed are not right
        displayException(400, 'your arguments are wrong', e);
    }
    if (!options.help && !options.version) { // OK
        if (!options.directory) { // minify normal file (not directory)
            await minifyAndWriteNewFile(options.file, options.willMinifyHex, options.suffix, options.output ? options.output : options.file);
        } else { // minify directory
            for (const file of findFilesInDir(options.directory)) { // every file found
                await minifyAndWriteNewFile(file, options.willMinifyHex, options.suffix);
            }
        }
    } else if (options.help) { // if the user specified help
        showHelp();
    } else if (options.version) { // if the user specified version
        showVersion();
    }
}

export async function minifyAndWriteNewFile(file: string, minifyHex: boolean, suffix: string, newFilePath: string = file) {
    const content: string[] = await readFileContent(file);
    const minifiedCode = detectLanguageAndMinify(file, content, minifyHex);
    createFile(newFilePath, minifiedCode, newFilePath !== file ? '' : suffix);
}
