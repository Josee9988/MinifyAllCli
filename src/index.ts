import {GlobalMinifierClass} from "./controller/globalMinifier";
import {displayException} from "./cli/displayException";

/**
 * Function that detects the language given by the path and returns the minimized code.
 *
 * @param path the path to look for the file to be minified.
 * @param content the non minified code.
 * @param willMinifyHex if the user will minify hex and rgb values.
 */
export function detectLanguageAndMinify(path: string, content: string[], willMinifyHex: boolean): string {
    const minifier: GlobalMinifierClass = new GlobalMinifierClass(willMinifyHex);
    switch (path.substr(path.lastIndexOf('.'), path.length)) {
        case LanguagesEnum.HTML:
            return minifier.minifyHtml(content);
        case LanguagesEnum.CSS:
            return minifier.minifyCssScssLessSass(content);
        case LanguagesEnum.JSON: case LanguagesEnum.JSONC:
            return minifier.minifyJsonJsonc(content);
        default:
            displayException(402, 'file extension not recognized', path);
            break;
    }
}

/**
 * Enum of the languages available.
 */
enum LanguagesEnum {
    /**
     * Html language
     */
    HTML = '.html',
    /**
     * Css language
     */
    CSS = '.css',
    /**
     * Json language
     */
    JSON = '.json',
    /**
     * Jsonc language
     */
    JSONC = '.jsonc',
}
