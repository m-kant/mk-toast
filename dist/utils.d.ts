import { Options, XOptions } from './types';
/** get HTMLElement of board for all messages (different boards at different cornerers of screen) */
export declare function _getToastBoard(options: XOptions): Element;
export declare function _computePositionCssClasses(options: Options): XOptions;
export declare function _newEl(tagName: any, className?: string, innerHtml?: string): any;
export declare function _height(el: any): any;
export declare function _appendMessage(el: any): void;
export declare function _closeMessage(el: any): void;
/**
 * welds several objects into new one
 * if one arg is given, it will be cloned
 * @returns {object}
 */
export declare function _weld(...args: any[]): Options;
