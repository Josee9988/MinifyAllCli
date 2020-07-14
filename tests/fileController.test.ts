/**
 * @file fileController.test.ts file that contains all the tests to test the fileController.ts file.
 */

import {createFile, findFilesInDir, getNewFileName, readFileContent} from "../src/controller/fileController";
import path from 'path';
import os from 'os';

test('GetNewFileName works', async () => {
    const result: string = getNewFileName('/usr/local/etc/myCssFile.subName.css', '-minified');
    const result2: string = getNewFileName('/usr/local/etc/myCssFile.subName-minified.css', '-minified');
    const result3: string = getNewFileName('/usr/local/etc/myCssFile.subName.css', '.min');
    const result4: string = getNewFileName('/usr/local/etc/myCssFile.subName.css', '');

    expect(result).toStrictEqual('/usr/local/etc/myCssFile.subName-minified.css');
    expect(result2).toStrictEqual('/usr/local/etc/myCssFile.subName-minified-minified.css');
    expect(result3).toStrictEqual('/usr/local/etc/myCssFile.subName.min.css');
    expect(result4).toStrictEqual('/usr/local/etc/myCssFile.subName.css');
});

test('FindFilesInDir works', async () => {
    const result: string[] = findFilesInDir(path.join(__dirname, '/../', 'tests/.exampleTestFiles/'));
    const filteredResult = result.filter(item => item !== '/home/jose/Git/MinifyAllCli/tests/.exampleTestFiles/testFile.min.css');
    expect(filteredResult).toStrictEqual([
        path.join(__dirname, '/../', 'tests/.exampleTestFiles/', 'jsonCFile.jsonc'),
        path.join(__dirname, '/../', 'tests/.exampleTestFiles/', 'jsonFile.json'),
        path.join(__dirname, '/../', 'tests/.exampleTestFiles/', 'myWebpage.html'),
        path.join(__dirname, '/../', 'tests/.exampleTestFiles/', 'styles.css')
    ])
});

test('readFileContent works', async () => {
    const result: string[] = await readFileContent(path.join(__dirname, '/../', 'tests/.exampleTestFiles/styles.css'));
    expect(result).toStrictEqual([".myClass {", "    background-color: rgba(12, 12, 12, 0.8);", "    background-color: rgb(12, 12, 12);", "    background-color: #FAFAFA;", "    /*other comment*/", "    content: url(\"https://github.com/Josee9988/MinifyAll\");", "    margin-right: 0px;", "}/* my comment", "    */", ""]);
});

test('createFile works', async () => {
    await createFile(path.join(__dirname, '/../', 'tests/.exampleTestFiles/testFile.css'), 'randomContent' + os.EOL + 'a', '.min');
    const fileContentFromCreatedFile: string[] = await readFileContent(path.join(__dirname, '/../', 'tests/.exampleTestFiles/testFile.min.css'));
    expect(fileContentFromCreatedFile).toStrictEqual(['randomContent', 'a']);
});
