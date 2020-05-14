/**
 * @file fileController.test.ts file that contains all the tests to test the fileController.ts file.
 */

import {getNewFileName} from "../src/controller/fileController";

test('GetNewFileName works', () => {
    const result: string = getNewFileName('/usr/local/etc/myCssFile.subName.css', '-minified');
    const result2: string = getNewFileName('/usr/local/etc/myCssFile.subName-minified.css', '-minified');
    const result3: string = getNewFileName('/usr/local/etc/myCssFile.subName.css', '.min');
    const result4: string = getNewFileName('/usr/local/etc/myCssFile.subName.css', '');

    expect(result).toBe('/usr/local/etc/myCssFile.subName-minified.css');
    expect(result2).toBe('/usr/local/etc/myCssFile.subName-minified-minified.css');
    expect(result3).toBe('/usr/local/etc/myCssFile.subName.min.css');
    expect(result4).toBe('/usr/local/etc/myCssFile.subName.css');
});
