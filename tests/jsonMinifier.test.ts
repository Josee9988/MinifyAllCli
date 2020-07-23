/**
 * @file jsonMinifier.test.ts file that contains all the tests related to the minimization of the JSON/C code.
 * TODO: write more JSON tests
 */

import {MinifyAllClass} from "../src";

test('JSON will not remove spaces after a comma inside a text string (issue #43)', () => {
    const minifier: MinifyAllClass = new MinifyAllClass(true);
    const result: string = minifier.minifyJsonJsonc(['[', '{', '"textStrings": "Welcome, stay a while!"', '},', '{', '"textStrings": "Goodbye, take care!"', '}', ']']);
    expect(result).toBe('[{"textStrings":"Welcome, stay a while!"},{"textStrings":"Goodbye, take care!"}]');
});

test('JSON will remove spaces before colon and before double quotes (MinifyAll issue #18)', () => {
    const minifier: MinifyAllClass = new MinifyAllClass(true);
    const result: string = minifier.minifyJsonJsonc(['{', '    "Object1" : ["item1" , true , 0 , "item4" ]', '}']);
    expect(result).toBe('{"Object1":["item1",true , 0 ,"item4"]}');
});
