/* eslint-disable class-methods-use-this */

/**
 * @file That is called to perform hex shortened values
 * @author Jose Gracia Berenguer
 * @since 0.2.1
 * @see ../README.md
 * @link https://github.com/Josee9988/MinifyAll repository.
 * @link https://github.com/Josee9988/MinifyAll/issues issues and enhancements.
 */

/**
 * HexMinifier minifies HEXADECIMAL/RGB/A values.
 */
export class ColorMinifier {
    /**
     * Summary Minifier constructor that maps and trims the code.
     *
     * @param  cssContent all the code that will be modified
     */
    constructor(private cssContent: string[]) {
    }

    /**
     * Summary shorts hexadecimal 6digits to 3 digits.
     *
     * Description shortHex function that checks every line of the original content,
     * and looks for hexadecimal 6 digits and calls getShortHexColorCode
     * for getting a 3 digit hexadecimal value; Then it replaces the
     * original line with the shortened one.
     */
    public shortHexMain(): void {
        for (let i = 0; i < this.cssContent.length; i++) {
            const hexadecimal: RegExpMatchArray | null = this.cssContent[i].match(/#[0-9a-fA-F]+/ig);
            if (hexadecimal !== null && hexadecimal.toString().length === 7) {
                const hexadecimalString: string = hexadecimal.toString();
                const shortHex: string = this.getShortHexColorCode(hexadecimalString);
                if (shortHex !== null) this.cssContent[i] = this.cssContent[i].replace(hexadecimalString, shortHex);
            }
        }
    }

    /**
     * Summary looks for rgb values and gets a 3digit hexadecimal values.
     *
     * Description shortRGBMain function that checks every line of the original content
     * and looks for rgb values and calls rgbToShortHex
     * for getting a 3 digit hexadecimal value;
     * Then it replaces the original line with the shortened one.
     */
    public shortRGBMain(): void {
        for (let i = 0; i < this.cssContent.length; i++) {
            const rgb: RegExpMatchArray | null = this.cssContent[i].match(/((rgb)\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig);
            if (rgb !== null) {
                const rgbString: string = rgb.toString();
                const result: any = this.rgbArrayToObject(rgbString);
                if (result !== null) {
                    const shortHex: string = this.rgbToShortHex(result);
                    this.cssContent[i] = this.cssContent[i].replace(rgbString, shortHex);
                }
            }
        }
    }

    /**
     * Summary rgba values to hexadecimal values.
     *
     * Description shortRGBAMain function that checks every line of the original content
     * and looks for rgba values and calls rgba2hex
     * for getting a 8 digit hexadecimal value;
     * Then it replaces the original line with the shortened one.
     */
    public shortRGBAMain(): void {
        for (let i = 0; i < this.cssContent.length; i++) {
            const rgb: RegExpMatchArray | null = this.cssContent[i].match(/((rgba)\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig);
            if (rgb !== null) {
                const rgbaString: string = rgb.toString();
                const percent: RegExpMatchArray | null = rgbaString.match(/[%]/g);
                if (percent === null) {
                    const result: string = this.rgba2hex(rgbaString);
                    this.cssContent[i] = this.cssContent[i].replace(rgbaString,
                        result.toString().toUpperCase());
                }
            }
        }
    }

    /**
     * Summary from a rgba without transparency to a 8 digit hexadecimal value.
     *
     * Description rgba2hex function that receives a rgba non % based
     * (without transparency) and transforms it into a hexadecimal
     * 8 digit value.
     *
     * @param rgba original rgba number
     */
    // tslint:disable:no-bitwise
    public rgba2hex(rgba: any): string {
        let a: any;
        const rgb: any = rgba.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
        const alpha: any = (rgb && rgb[4] || '').trim();
        let hex: any = rgb ?
            (rgb[1] | 1 << 8).toString(16).slice(1) +
            (rgb[2] | 1 << 8).toString(16).slice(1) +
            (rgb[3] | 1 << 8).toString(16).slice(1) : rgba;

        if (alpha !== '') {
            a = alpha;
        } else {
            a = 0o1;
        }
        a = ((a * 255) | 1 << 8).toString(16).slice(1);
        hex += a;
        return `#${hex.toString().toUpperCase()}`;
    }

    /**
     * Summary from a String with rgb to an
     * object with red green and blue values.
     *
     * Description rgbArrayToObject receives a String with the
     * rgb and turns it into an object with r, g, and b value.
     *
     * @param rgbString a string with the rgb and its values.
     *
     * @return rgb r g b integers result with the red, yellow and green.
     */
    public rgbArrayToObject(rgbString: string): any {
        const matchColors: RegExp = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
        const match: RegExpExecArray | null = matchColors.exec(rgbString);
        return match ? {
            r: parseInt(match[1], 16),
            g: parseInt(match[2], 16),
            b: parseInt(match[3], 16),
        } : null;
    }

    /**
     * Summary from a 6 digit hexadecimal to a 3 digit hexadecimal.
     *
     * Description getShortHexColorCode receives the 6digit hex code
     * calls the needed functions and returns a 3digit hex.
     *
     * @param code receives the 6digit hex code.
     */
    public getShortHexColorCode(code: string): string {
        const rgb: any = this.hexToRgb(code);
        return this.rgbToShortHex(rgb).toUpperCase();
    }

    /**
     * Summary from a String with and hexadecimal to an object with
     * red green and blue values.
     *
     * Description hexToRgb receives a String with an hexadecimal value
     * and returns red green and blue values.
     *
     * @param hex the hexadecimal value.
     *
     * @return r g b integers result with the red, yellow and green.
     */
    public hexToRgb(hex: string): any {
        const shorthandRegex: RegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (r, g, b) => r + r + g + g + b + b);
        const result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : null;
    }

    /**
     * Summary from an object with r,g,b values to 3 digit hex
     *
     * Description rgbToShortHex receives an object with red green and blue values
     * then it shorts red green and blue into just one number
     * and it will finally get a 3 digit hex.
     *
     * @param rgb object with red, green and blue values.
     */
    public rgbToShortHex(rgb: any): string {
        try {
            const hexR: string = Math.round(rgb.r / 17).toString(16);
            const hexG: string = Math.round(rgb.g / 17).toString(16);
            const hexB: string = Math.round(rgb.b / 17).toString(16);
            return `#${hexR}${hexG}${hexB}`;
        } catch (e) {
            return rgb;
        }
    }

    /**
     * Summary getHexMinified returns the content with the hex minified.
     */
    public getHexMinified(): string[] {
        return this.cssContent;
    }
}
