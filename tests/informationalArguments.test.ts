/**
 * @file informationalArguments.test.ts file that contains all the tests related to
 * the '--help' and '--version' arguments (informational arguments),
 */

import {startCommand} from "../src/cli/cli";
import Chalk from 'chalk';

test('showVersion console logs the right version ', () => {
    const version = '1.1.3';
    const log = jest.spyOn(global.console, 'log')

    // full word argument
    startCommand(['bin1', 'bin2', '--version']);
    expect(log).toHaveBeenCalledWith(`MinifyAllCLI version ${Chalk.bold.gray(version)}`)

    // shorthand argument
    startCommand(['bin1', 'bin2', '-v']);
    expect(log).toHaveBeenCalledWith(`MinifyAllCLI version ${Chalk.bold.gray(version)}`)
});
