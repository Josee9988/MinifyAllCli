/**
 * @file That is called for performing comment removing
 * removes // and / * * / comments
 * @author Jose Gracia Berenguer
 * @since 0.2.2
 * @see README.md
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */

/**
 * class CommentRemover which will remove comments.
 */
export class CommentRemover {
    /**
     * Summary Minifier constructor that maps and trims the code.
     *
     * @param lineContent all the code that will be minified.
     */
    constructor(private lineContent: string[]) {
    }

    /**
     * Summary getLineRemoved finds lasts spaces and trim it into just one line.
     *
     * @return the line minified.
     */
    public getCommentsRemoved(): string[] {
        return this.lineContent;
    }

    /**
     * Summary main method that perform all the tasks to remove comments.
     *
     * Description removeCommentsMain method that is called when
     * you want to remove the comments from the array of lines
     * First remove all the multiline comments in the same line
     * calls removeComments.
     * Then it calls the method removeComments
     * which receives a single string and it does all the job;
     * This method is only a for with a method call.
     */
    public removeCommentsMain(): void {
        let willPreserveComment: boolean = false;
        const toAddContent: string[] = [];
        let toAddContentCounter: number = 0;
        // Remove multiline comments in the same line
        for (let i = 0; i < this.lineContent.length; i++) {
            if (this.lineContent[i].match(/@preserve/g) !== null) { // start preserving
                willPreserveComment = true;
                toAddContent[toAddContentCounter] = this.lineContent[i].replace(/@preserve/g, '') + '@@minifyallspace@@';
                toAddContentCounter++;
            } else if (this.lineContent[i].match(/@endpreserve/g) !== null) { // stop preserving
                willPreserveComment = false;
                toAddContent[toAddContentCounter + 1] = this.lineContent[i + 1];
                this.lineContent[i] = this.lineContent[i].replace(/\/\*([\s\S]*?)\*\//g, '');
            } else if (willPreserveComment === true) { // continue preserving
                toAddContent[toAddContentCounter] = this.lineContent[i] + '@@minifyallspace@@';
                toAddContentCounter++;
            }
        }
        let lineContentString: string = this.removeComments(this.lineContent.join('\n'));
        lineContentString = toAddContent + lineContentString;
        this.lineContent = lineContentString.split('\n');
    }

    /**
     * Summary removes most of the '//' comments.
     *
     * Description removeComments method that removes all the single line and multiline
     * comments from a String and it returns the new string without the comments,
     * it also support comments inside string which are not comments
     *
     * Remove single-line comments that contain would-be multi-line delimiters
     * Example // Comment /* <--
     * Remove multi-line comments that contain would be single-line delimiters
     * Example /* // <--
     *
     * Don't Removes regex
     *
     * Don't Removes string
     *
     * Remove multi-line comments that have a replace ending (string/regex)
     * Greedy, so no inner strings/regex will stop it.
     *
     * @param str the string to remove the comments.
     */
    public removeComments(str: string): string {
        const uid = `_${+new Date()}`;
        const primatives: string[] = [];
        let primIndex = 0;
        return (
            str
                .replace(/(['"])(\\\1|.)+?\1/g, (match) => {
                    primatives[primIndex] = match;
                    return `${uid}${primIndex++}`;
                })
                .replace(/https:\/\//g, 'https:/')
                .replace(/http:\/\//g, 'http:/')
                .replace(/\/\/.*?\/?\*.+?(?=\n|\r|$)|\/\*[\s\S]*?\/\/[\s\S]*?\*\//g, '')
                .replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g, '')
                .replace(RegExp(`\\/\\*[\\s\\S]+${uid}\\d+`, 'g'), '')
                // tslint:disable-next-line: variable-name
                .replace(RegExp(`${uid}(\\d+)`, 'g'), (_match, n) => primatives[n])
                .replace(/https:\//g, 'https://')
                .replace(/http:\//g, 'http://')
                .replace(/https:\/\/\//g, 'https://')
                .replace(/http:\/\/\//g, 'http://')
        );
    }
}
