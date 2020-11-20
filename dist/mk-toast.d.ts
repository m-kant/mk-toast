import type { Message, Options } from './types';
import { _closeMessage } from './utils';
/**
 * Publishes toast message into the board
 * Creates board if it does not exists and mounts it into document
 * @param opts overrides defaults for individual message
 */
declare function print(opts: Options): Message;
declare const _default: {
    defaults: Options;
    closeMessage: typeof _closeMessage;
    danger: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    echo: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    /** Alias for danger */
    error: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    info: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    print: typeof print;
    success: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    /** Alias for success */
    ok: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    warning: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    /** Alias for warning */
    warn: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
};
/**
 * Publish stacked notifications at the side of screen
 */
export default _default;
