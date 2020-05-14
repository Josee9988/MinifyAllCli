/**
 * @file minifyall.test.ts file that contains all the tests to the core of Minifyall.
 */

import {GlobalMinifierClass} from "../src/controller/globalMinifier";

test('CSS main Minify (/controller/globalMinifiers', () => {
    const minifier = new GlobalMinifierClass(true);
    const result = minifier.minifyCssScssLessSass(
        [
            '@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");',
            '',
            '@media(max-width:850px) {',
            '    #tableRoot {',
            '        font-size: 120x;',
            '    }',
            '    #headRootPanel {',
            '        font-size: 12px;',
            '    }',
            '    .actionbuttons {',
            '        margin: 2px;',
            '    }',
            '}',
            '#login-block {',
            '    -webkit-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);',
            '    -moz-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);',
            '    box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);',
            '    z-index: 2;',
            '}',
            '/*---------------------------------------------*/',
            'h1,',
            'h2{',
            '  margin: 0px;',
            '}',
        ],
    );
    expect(result).toBe('@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");@media(max-width:850px){#tableRoot{font-size:120x}#headRootPanel{font-size:12px}.actionbuttons{margin:2px}}#login-block{-webkit-box-shadow:0 0 45px 0 #00000066;-moz-box-shadow:0 0 45px 0 #00000066;box-shadow:0 0 45px 0 #00000066;z-index:2;}h1,h2{margin:0;}');
});
