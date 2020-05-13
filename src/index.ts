import {GlobalMinifierClass} from "./controller/globalMinifier";
import {displayException} from "./cli/displayException";

export function detectLanguageAndMinify(path: string, content: string[], willMinifyHex: boolean): string {
    const minifier: GlobalMinifierClass = new GlobalMinifierClass(willMinifyHex);
    switch (path.substr(path.lastIndexOf('.'), path.length)) {
        case LanguagesEnum.HTML:
            return minifier.minifyHtml(content);
        case LanguagesEnum.CSS:
            return minifier.minifyCssScssLessSass(content);
        case LanguagesEnum.JSON:
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
}
