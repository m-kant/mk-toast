import type { EchoMethod, MsgType, Options, XOptions } from './types';
import { _appendMessage, _closeMessage, _computePositionCssClasses, _getToastBoard, _newEl, _weld, } from './utils';

const defaults: Options = {
  position: 'right bottom', // left|center|right top|bottom
  duration: 5000,           // milliseconds
  type:     'default',      // default|info|danger|success|warning
  title:    '',             // string or html of message
  message:  'Attention',    // string or html of message
  container: null,          // parent HTMLElement of toast messages, default is body
};

/**
 * Places toast message into DOM.
 * Easier to use syntax sugar - mktoast.echo(message) and so on.
 * @param {object} options rewrites defaults for individual message
 * @returns {HTMLElement}
 */
function print(opts: Options) {
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
  return wrapperEl;
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
  return { ...options, message, title, type};
}

const echo: EchoMethod =  function (message, title, options) {
  return this.print(_echoArgsToOptions('default', message, title, options));
};
const danger: EchoMethod = function (message, title, options) {
  return this.print(_echoArgsToOptions('danger', message, title, options));
};
const success: EchoMethod = function(message, title, options) {
  return this.print(_echoArgsToOptions('success', message, title, options));
};
const warning: EchoMethod = function(message, title, options) {
  return this.print(_echoArgsToOptions('warning', message, title, options));
};
const info: EchoMethod = function(message, title, options) {
  return this.print(_echoArgsToOptions('info', message, title, options));
};

/**
 * Publish stacked messages at the side of screen
 * @type mktoast
 */
export default {
  defaults,
  closeMessage: _closeMessage,
  danger,
  echo,
  /** Alias for danger */
  error: danger,
  info,
  print,
  success,
  /** Alias for success */
  ok: success,
  warning,
  /** Alias for warning */
  warn: warning,
};
