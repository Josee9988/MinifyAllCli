import Chalk from 'chalk';

/**
 * Version that will be updated with the "versionUpdater.sh" script.
 */
const version = '1.1.2';

/**
 * Summary: showVersion outputs the version of the package.
 */
export function showVersion(): void {
    console.log(Chalk.bold.gray(version));
}

/**
 * Summary: showHelp shows the help for the package 'minifyall'
 * it outputs all the global options, usage, hints and some examples of use.
 */
export function showHelp(): void {
    console.log(Chalk.green('\nMinifyAllCli') + Chalk.gray(` v${version}`));

    console.log(`\n${Chalk.bold('Usage')}: ${Chalk.yellow('minifyall')} ${Chalk.magenta('[file] [options]\n')}`);

    console.log(Chalk.bold('Global options:\n'));
    console.log('  -h, --help\t\t  Output usage information. (will ignore any other arguments)');
    console.log('  -v, --version\t\t  Output package version. (will ignore any other arguments)');
    console.log('  -m, --minify-hex\t\t  Will minify the hexadecimal color values. (default = false)');
    console.log('  -s, --suffix\t\t  Append a suffix string to the minified filename');
    console.log('  -o, --output\t\t  The new output file (will ignore "--suffix" argument)');
    console.log('  -d, --dir\t\t  Will recursively look for HTML/CSS/JSON files inside a directory and will minify every one (will ignore "--output" argument)');

    console.log(Chalk.bold('\nExamples of use:'));
    console.log('  minifyall --help');
    console.log('  minifyall --version');
    console.log('  minifyall myFile.css');
    console.log('  minifyall pathToMyFile/dirs/myFile.css')
    console.log('  minifyall myFile.css -m -s .min');
    console.log('  minifyall myFile.css --minify-hex -s -minified');
    console.log('  minifyall myFile.css --output someFolder/myNewFile.css');
    console.log('  minifyall --dir myFolder/');

    console.log(`\nFor more information visit: ${Chalk.bold('https://github.com/Josee9988/MinifyAllCli')}`);
}
