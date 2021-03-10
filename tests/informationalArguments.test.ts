/**
 * @file informationalArguments.test.ts file that contains all the tests related to
 * the '--help' and '--version' arguments (informational arguments),
 */

import {startCommand} from "../src/cli/cli";
import Chalk from 'chalk';

const version = '1.1.10';


test('showVersion console logs the right version ', () => {
    const log = jest.spyOn(global.console, 'log')

    startCommand(['bin1', 'bin2', '--version']);
    expect(log).toHaveBeenCalledWith(`MinifyAllCLI version ${Chalk.bold.gray(version)}`)
});


test('showHelp console logs the right information ', () => {
    const log = jest.spyOn(global.console, 'log')

    // full word argument
    startCommand(['bin1', 'bin2', '--help']);
    expect(log).toHaveBeenCalledWith(Chalk.green('\nMinifyAllCli') + Chalk.gray(` v${version}`));

    expect(log).toHaveBeenCalledWith(Chalk.bold('Global options:\n'));
    expect(log).toHaveBeenCalledWith('  -h, --help\t\t  Output usage information. (will ignore any other arguments)');
    expect(log).toHaveBeenCalledWith('  -v, --version\t\t  Output package version. (will ignore any other arguments)');
    expect(log).toHaveBeenCalledWith('  -m, --minify-hex\t\t  Will minify the hexadecimal color values. (default = false)');
    expect(log).toHaveBeenCalledWith('  -s, --suffix\t\t  Append a suffix string to the minified filename');
    expect(log).toHaveBeenCalledWith('  -o, --output\t\t  The new output file (will ignore "--suffix" argument)');
    expect(log).toHaveBeenCalledWith('  -d, --dir\t\t  Will recursively look for HTML/CSS/JSON files inside a directory and will minify every one (will ignore "--output" argument)');

    expect(log).toHaveBeenCalledWith(Chalk.bold('\nExamples of use:'));
    expect(log).toHaveBeenCalledWith('  minifyall --help');
    expect(log).toHaveBeenCalledWith('  minifyall --version');
    expect(log).toHaveBeenCalledWith('  minifyall myFile.css');
    expect(log).toHaveBeenCalledWith('  minifyall pathToMyFile/dirs/myFile.css')
    expect(log).toHaveBeenCalledWith('  minifyall myFile.css -m -s .min');
    expect(log).toHaveBeenCalledWith('  minifyall myFile.css --minify-hex -s -minified');
    expect(log).toHaveBeenCalledWith('  minifyall myFile.css --output someFolder/myNewFile.css');
    expect(log).toHaveBeenCalledWith('  minifyall --dir myFolder/');

    expect(log).toHaveBeenCalledWith(`\nFor more information visit: ${Chalk.bold('https://github.com/Josee9988/MinifyAllCli')}`);
});
