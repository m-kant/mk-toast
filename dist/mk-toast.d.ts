import type { Message, Options } from './types';
import { _closeMessage } from './utils';
/**
 * Publish toast message into the board
 * Creates board if it does not exists and mounts it into document
 * @param opts overrides defaults for individual message
 */
declare function print(opts: Options): Message;
/**
 * Publish stacked notifications at the side of screen
 */
declare const _default: {
    defaults: Options;
    closeMessage: typeof _closeMessage;
    /** Publish red color message */
    danger: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    /** Publish default neutral gray color message */
    echo: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    /** Alias for danger */
    error: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    /** Publish blue color message */
    info: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    /**
    * Publish toast message into the board
    * Creates board if it does not exists and mounts it into document
    * @param opts overrides defaults for individual message
    */
    print: typeof print;
    /** Publish green color message */
    success: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    /** Alias for success */
    ok: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    /** Publish orange color message */
    warning: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
    /** Alias for warning */
    warn: (message: string, title?: string, options?: Partial<import("./types").ShortOptions>) => Message;
};
export default _default;
