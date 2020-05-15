import {showHelp, showVersion} from './informationCLI';
import {ArgumentsOptions, parseArgumentsIntoOptions} from "./argumentParser";
import {createFile, findFilesInDir, readFileContent} from "../controller/fileController";
import {displayException} from "./displayException";
import {detectLanguageAndMinify} from "../controller/detectLanguageAndMinify";

/**
 * First function called from the bin/ folder when the user executes the CLI command.
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
    if (!options.help && !options.version) { // if the arguments are not help nor version (OK)
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

/**
 * minifyAndWriteNewFile will read the content from a file, minify the code and write it to a new file.
 *
 * @param filePath the file path to be minified.
 * @param willMinifyHex if the user wants to minify hexadecimal values or not.
 * @param suffix the suffix given.
 * @param newFilePath if the user specified the output argument, if so, it will replace the original filePath.
 */
export async function minifyAndWriteNewFile(filePath: string, willMinifyHex: boolean, suffix: string, newFilePath: string = filePath): Promise<void> {
    const content: string[] = await readFileContent(filePath);
    const minifiedCode = detectLanguageAndMinify(filePath, content, willMinifyHex);
    createFile(newFilePath, minifiedCode, newFilePath !== filePath ? '' : suffix);
}
