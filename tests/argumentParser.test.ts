/**
 * @file argumentParser.test.ts file that tests the argumentParser.ts file.
 */

import {ArgumentsOptions, parseArgumentsIntoOptions} from "../src/cli/argumentParser";

test('parseArgumentsIntoOptions help argument works', () => {
    const resultHelp: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '--help']);
    const resultHelpShort: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '-h']);

    expect(resultHelp).toStrictEqual({
        "directory": null,
        "file": "",
        "help": true,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
    expect(resultHelpShort).toStrictEqual({
        "directory": null,
        "file": "",
        "help": true,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
});


test('parseArgumentsIntoOptions version argument works', () => {
    const resultVersion: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '--version']);
    const resultVersionShort: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '-v']);

    expect(resultVersion).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": null,
        "suffix": "",
        "version": true,
        "willMinifyHex": false
    });
    expect(resultVersionShort).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": null,
        "suffix": "",
        "version": true,
        "willMinifyHex": false
    });
});


test('parseArgumentsIntoOptions minify hex (colors) argument works', () => {
    const resultMinifyHex: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '--minify-hex']);
    const resultMinifyHexShort: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '-m']);

    expect(resultMinifyHex).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": true
    });
    expect(resultMinifyHexShort).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": true
    });

});

test('parseArgumentsIntoOptions suffix argument works', () => {
    const resultDefaultSuffix: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2']);
    const resultSuffix: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '--suffix', 'minified']);
    const resultSuffixShort: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '-s', 'minified']);

    expect(resultDefaultSuffix).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
    expect(resultSuffix).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": null,
        "suffix": "minified",
        "version": false,
        "willMinifyHex": false
    });
    expect(resultSuffixShort).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": null,
        "suffix": "minified",
        "version": false,
        "willMinifyHex": false
    });
});

test('parseArgumentsIntoOptions output argument works', () => {
    const resultDefaultOutput: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2']);
    const resultOutput: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '--output', '/myPath']);
    const resultOutputShort: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '-o', '/myPath/file.css']);

    expect(resultDefaultOutput).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
    expect(resultOutput).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": '/myPath',
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
    expect(resultOutputShort).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": '/myPath/file.css',
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
});

test('parseArgumentsIntoOptions dir argument works', () => {
    const resultDefaultDir: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2']);
    const resultDir: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '--dir', '/myPath']);
    const resultDirShort: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', '-d', '/myPath']);

    expect(resultDefaultDir).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
    expect(resultDir).toStrictEqual({
        "directory": '/myPath',
        "file": "",
        "help": false,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
    expect(resultDirShort).toStrictEqual({
        "directory": '/myPath',
        "file": "",
        "help": false,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
});

test('parseArgumentsIntoOptions file argument works', () => {
    const resultDefaultFile: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2']);
    const resultFile: ArgumentsOptions = parseArgumentsIntoOptions(['bin1', 'bin2', 'myFile.css']);

    expect(resultDefaultFile).toStrictEqual({
        "directory": null,
        "file": "",
        "help": false,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
    expect(resultFile).toStrictEqual({
        "directory": null,
        "file": 'myFile.css',
        "help": false,
        "output": null,
        "suffix": "",
        "version": false,
        "willMinifyHex": false
    });
});
