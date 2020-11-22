import type { EchoMethod, Message, MsgType, Options, XOptions } from './types';
import { _appendMessage, _closeMessage, _computePositionCssClasses, _getToastBoard, _newEl, _weld, } from './utils';

const defaults: Options = {
  position: 'right bottom', // left|center|right top|bottom
  duration: 5000,           // milliseconds
  type: 'default',      // default|info|danger|success|warning
  title: '',             // string or html of message
  message: 'Attention',    // string or html of message
  container: null,          // parent HTMLElement of toast messages, default is body
};

/**
 * Publish toast message into the board
 * Creates board if it does not exists and mounts it into document
 * @param opts overrides defaults for individual message
 */
function print(opts: Options): Message {
  opts = _weld(this.defaults, opts);
  const options = _computePositionCssClasses(opts) as XOptions;
  options.boardEl = _getToastBoard(options);

  // wrapper to handle animation
  const wrapperEl = _newEl('div', 'mktoast-message__wrapper mk-hide');

  // message with title, body and close button
  const messageEl = _newEl('div', `mktoast-message mktoast-message_${options.type}`);
  wrapperEl.appendChild(messageEl);

  if (options.title) {
    messageEl.appendChild(_newEl('h2', 'mktoast-message__title', options.title));
  }

  messageEl.appendChild(_newEl('div', 'mktoast-message__body', options.message));

  const closeEl = _newEl('div', 'mk-close');
  closeEl.onclick = () => {
    _closeMessage(wrapperEl);
  };
  messageEl.appendChild(closeEl);

  wrapperEl.mktoast = options;
  _appendMessage(wrapperEl);
  return { el: messageEl, wrapperEl, boardEl: options.boardEl };
};


// SYNTAX SUGAR, messages with predefined styles ---

function _echoArgsToOptions(
  type: MsgType,
  message: string,
  title: string | Partial<Options>,
  options?: Partial<Options>,
) {
  // if title is an option indeed
  if (typeof title === 'object') {
    options = title;
    title = null;
  }
  return { ...options, message, title, type };
}
/** Publish default neutral gray color message */
const echo: EchoMethod = function (message, title, options) {
  return this.print(_echoArgsToOptions('default', message, title, options));
};
/** Publish red color message */
const danger: EchoMethod = function (message, title, options) {
  return this.print(_echoArgsToOptions('danger', message, title, options));
};
/** Publish green color message */
const success: EchoMethod = function (message, title, options) {
  return this.print(_echoArgsToOptions('success', message, title, options));
};
/** Publish orange color message */
const warning: EchoMethod = function (message, title, options) {
  return this.print(_echoArgsToOptions('warning', message, title, options));
};
/** Publish blue color message */
const info: EchoMethod = function (message, title, options) {
  return this.print(_echoArgsToOptions('info', message, title, options));
};

/**
 * Publish stacked notifications at the side of screen
 */
export default {
  defaults,
  closeMessage: _closeMessage,
  /** Publish red color message */
  danger,
  /** Publish default neutral gray color message */
  echo,
  /** Alias for danger */
  error: danger,
  /** Publish blue color message */
  info,
  /**
  * Publish toast message into the board
  * Creates board if it does not exists and mounts it into document
  * @param opts overrides defaults for individual message
  */
  print,
  /** Publish green color message */
  success,
  /** Alias for success */
  ok: success,
  /** Publish orange color message */
  warning,
  /** Alias for warning */
  warn: warning,
};
