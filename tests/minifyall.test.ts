/**
 * @file minifyall.test.ts file that contains all the tests to the core of Minifyall.
 * Mainly based on the already built tests from the original MinifyAll VSCode extension.
 */

import {GlobalMinifierClass} from "../src/controller/globalMinifier";
import {HexMinifier} from "../src/controller/hexMinifier";
import {CssMinifier} from "../src/controller/langDefaultMinifiers/cssMinifier";
import {HtmlMinifier} from "../src/controller/langDefaultMinifiers/htmlMinifier";
import {JsonMinifier} from "../src/controller/langDefaultMinifiers/jsonMinifier";

test('CSS main Minify with color minimization (/controller/globalMinifiers', () => {
        const minifier: GlobalMinifierClass = new GlobalMinifierClass(true);
        const result: string = minifier.minifyCssScssLessSass(['@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");', '', '@media(max-width:850px) {', '    #tableRoot {', '        font-size: 120x;', '    }', '    #headRootPanel {', '        font-size: 12px;', '    }', '    .actionbuttons {', '        margin: 2px;', '    }', '}', '#login-block {', '    -webkit-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);', '    -moz-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);', '    box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);', '    z-index: 2;', '}', '/*---------------------------------------------*/', 'h1,', 'h2{', '  margin: 0px;', '}',],);
        expect(result).toBe('@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");@media(max-width:850px){#tableRoot{font-size:120x}#headRootPanel{font-size:12px}.actionbuttons{margin:2px}}#login-block{-webkit-box-shadow:0 0 45px 0 #00000066;-moz-box-shadow:0 0 45px 0 #00000066;box-shadow:0 0 45px 0 #00000066;z-index:2;}h1,h2{margin:0;}');
});

test('CSS main Minify without color minimization (/controller/globalMinifiers', () => {
        const minifier: GlobalMinifierClass = new GlobalMinifierClass(false);
        const result: string = minifier.minifyCssScssLessSass(['@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");', '', '@media(max-width:850px) {', '    #tableRoot {', '        font-size: 120x;', '    }', '    #headRootPanel {', '        font-size: 12px;', '    }', '    .actionbuttons {', '        margin: 2px;', '    }', '}', '#login-block {', '    -webkit-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);', '    -moz-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);', '    box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);', '    z-index: 2;', '}', '/*---------------------------------------------*/', 'h1,', 'h2{', '  margin: 0px;', '}',],);
        expect(result).toBe('@import url(\"https://fonts.googleapis.com/css?family=Montserrat|Open+Sans\");@media(max-width:850px){#tableRoot{font-size:120x}#headRootPanel{font-size:12px}.actionbuttons{margin:2px}}#login-block{-webkit-box-shadow:0 0 45px 0 rgba(0,0,0,.4);-moz-box-shadow:0 0 45px 0 rgba(0,0,0,.4);box-shadow:0 0 45px 0 rgba(0,0,0,.4);z-index:2;}h1,h2{margin:0;}');
});

test('JSON main Minify (/controller/globalMinifiers.js)', () => {
        const minifier: GlobalMinifierClass = new GlobalMinifierClass(true);
        const result: string = minifier.minifyJsonJsonc(['"tokenColors": [', '        {', '            "name": "Comment",', '            "scope": [', '                "background",', '                "comment",', '                "punctuation.definition.comment"', '            ],', '            "settings": {', '                "fontStyle": "italic",', '                "foreground": "#72a15d"', '            }', '        },',],);
        expect(result).toBe('"tokenColors":[{"name":"Comment","scope":["background","comment","punctuation.definition.comment"],"settings":{"fontStyle":"italic","foreground":"#795"}},');
});

test('Hexadecimal Minify (controller/hexMinifier.js)', () => {
        const minifierHex: HexMinifier = new HexMinifier(['background-color: rgba(12, 12, 12, 0.8);', 'background-color: rgb(12, 12, 12);', 'background-color: #FAFAFA;'],);
        minifierHex.shortHexMain();
        minifierHex.shortRGBMain();
        minifierHex.shortRGBAMain();
        const result: string = minifierHex.getHexMinified().join('');
        expect(result).toBe('background-color: #0C0C0CCC;background-color: #111;background-color: #FFF;');
});

test('CSS Minify without commentRemover nor colorRemover (langDefaultMinifiers/cssMinifier.js)', () => {
        const cssMinify: CssMinifier = new CssMinifier(['@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");', '', '@media(max-width:850px) {', '    #tableRoot {', '        font-size: 120x;', '    }', '    #headRootPanel {', '        font-size: 12px;', '    }', '    .actionbuttons {', '        margin: 2px;', '    }', '}', '#login-block {', '    -webkit-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);', '    -moz-box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);', '    box-shadow: 0px 0px 45px 0px rgba(0, 0, 0, 0.4);', '    z-index: 2;', '}', '/*---------------------------------------------*/', 'h1,', 'h2{', '  margin: 0px;', '}',],);
        const result: string = cssMinify.getCssMinified();
        expect(result).toBe('@import url("https://fonts.googleapis.com/css?family=Montserrat|Open+Sans");@media(max-width:850px){#tableRoot{font-size:120x}#headRootPanel{font-size:12px}.actionbuttons{margin:2px}}#login-block{-webkit-box-shadow:0 0 45px 0 rgba(0,0,0,.4);-moz-box-shadow:0 0 45px 0 rgba(0,0,0,.4);box-shadow:0 0 45px 0 rgba(0,0,0,.4);z-index:2;}/*---------------------------------------------*/h1,h2{margin:0;}');
});

test('HTML Minify with its own commentRemover but without colorRemover (langDefaultMinifiers/htmlMinifier.js)', () => {
        const htmlMinify: HtmlMinifier = new HtmlMinifier(['<!DOCTYPE html>', '<html lang="es">', '', '<head>', '    <title></title>', '    <meta charset="utf-8">', '    <link rel="stylesheet" href="">', '    <script type="text/javascript" src=""></script>', '    <!-- test -->', '</head>', '', '<!-- ~~~~~✦✦✦✦✦ B O', ' D Y ✦✦✦✦✦~~~~~ -->', '<body>', '', '</body>', '', '</html>',],);
        htmlMinify.removeMultipleLineComments();
        const result: string = htmlMinify.getHtmlMinified();
        expect(result).toBe('<!DOCTYPE html><html lang="es"><head><title></title><meta charset="utf-8"><link rel="stylesheet" href=""><script type="text/javascript" src=""></script></head><body></body></html>');
});

test('JSON Minify without commentRemover nor colorRemover (langDefaultMinifiers/jsonMinifier.js)', () => {
        const jsonMinify: JsonMinifier = new JsonMinifier(['{', '"contributes": {', '"commands": [{', '"title": "Minify this document ⚡",', '},', '{', '"color": "#FAFAFA", ', '}/* multiline comment', '*/', ']', '}', '}',],);
        const result: string = jsonMinify.getJSONMinified();
        expect(result).toBe('{"contributes":{"commands":[{"title":"Minify this document ⚡"},{"color":"#FAFAFA"}]}}');
});

test('Function \'removeComments\' works', () => {
        const minifier: GlobalMinifierClass = new GlobalMinifierClass(true);
        const result: string = minifier.removeComments(['const assert; // simple comment.', '// full line', 'console.log(1+1); /* multiLine simple*/', 'let variable; /*comment', 'just a comment', 'stillcomment*/', 'console.log("all done");'],).join('');
        expect(result).toBe('const assert; console.log(1+1); let variable; console.log("all done");');
});
