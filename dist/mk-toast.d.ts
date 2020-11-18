import type { Options, XOptions } from './types';
/**
 * Publish stacked messages at the side of screen
 * @type mktoast
 */
declare const mktoast: {
    defaults: {
        position: string;
        duration: number;
        type: string;
        message: string;
        container: any;
    };
    /** get HTMLElement of board for all messages (different boards at different cornerers of screen) */
    _getToastBoard(options: XOptions): Element;
    _computePositionCssClasses(options: Options): XOptions;
    /**
     * Places toast message into DOM.
     * Easier to use syntax sugar - mktoast.echo(message) and so on.
     * @param {object} options rewrites defaults for individual message
     * @returns {HTMLElement}
     */
    print(opts: Options): any;
    _newEl(tagName: any, className?: string, innerHtml?: string): any;
    _height(el: any): any;
    _appendMessage(el: any): void;
    closeMessage(el: any): void;
    echo(message: string, title?: string, options?: string): any;
    danger(message: any, title: any, options: any): any;
    error(message: any, title: any, options: any): any;
    success(message: any, title: any, options: any): any;
    warning(message: any, title: any, options: any): any;
    info(message: any, title: any, options: any): any;
    /**
     * welds several objects into new one
     * if one arg is given, it will be cloned
     * @returns {object}
     */
    _weld(...args: any[]): Options;
};
export default mktoast;
