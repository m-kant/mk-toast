import type { Options } from './types';
import { _closeMessage } from './utils';
/**
 * Places toast message into DOM.
 * Easier to use syntax sugar - mktoast.echo(message) and so on.
 * @param {object} options rewrites defaults for individual message
 * @returns {HTMLElement}
 */
declare function print(opts: Options): any;
declare const _default: {
    defaults: Options;
    closeMessage: typeof _closeMessage;
    danger: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => HTMLElement;
    echo: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => HTMLElement;
    /** Alias for danger */
    error: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => HTMLElement;
    info: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => HTMLElement;
    print: typeof print;
    success: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => HTMLElement;
    /** Alias for success */
    ok: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => HTMLElement;
    warning: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => HTMLElement;
    /** Alias for warning */
    warn: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => HTMLElement;
};
/**
 * Publish stacked messages at the side of screen
 * @type mktoast
 */
export default _default;
