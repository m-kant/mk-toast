import { Options, XOptions } from './types';
import mk from './mk-toast';

/** get HTMLElement of board for all messages (different boards at different cornerers of screen) */
export function _getToastBoard(options: XOptions) {
  const container = options.container || document.body;
  let board = container.querySelector(`.mktoast__board.mk-${options.xPosition}.mk-${options.yPosition}`);
  if (board) return board;

  board = document.createElement('div');
  board.className = `mktoast__board mk-${options.xPosition} mk-${options.yPosition}`;
  container.appendChild(board);
  return board;
}

export function _computePositionCssClasses(options: Options): XOptions {
  const xoptions = options as XOptions;
  const position = options.position;

  if (position.indexOf('top') !== -1) {
    xoptions.yPosition = 'top';
  } else {
    xoptions.yPosition = 'bottom';
  }

  if (position.indexOf('left') !== -1) {
    xoptions.xPosition = 'left';
  } else if (position.indexOf('center') !== -1) {
    xoptions.xPosition = 'center';
  } else {
    xoptions.xPosition = 'right';
  }

  return xoptions;
}

export function _newEl(tagName, className = '', innerHtml = '') {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  if (innerHtml) el.innerHTML = innerHtml;
  return el;
}

export function _height(el) {
  return el.clientHeight;
}

export function _appendMessage(el) {
  const options = el.mktoast;
  options.boardEl.appendChild(el);
  const elHeight = _height(el);
  el.style.maxHeight = 0;

  // initiate appear transition
  setTimeout(() => {
    el.className = el.className.replace(/mk-hide/, '');
    el.style.maxHeight = elHeight + 'px';
  }, 10);
  // automatically remove node, when expires
  setTimeout(() => {
    _closeMessage(el);
  }, options.duration);
}

export function _closeMessage(el) {
  if (el.disappearing) return;
  const options = el.mktoast;
  if (el.parentNode !== options.boardEl) return; // already removed

  el.disappearing = true;
  el.className += 'mk-hide ';
  el.style.maxHeight = 0;
  setTimeout(() => {
    options.boardEl.removeChild(el);
  }, 300);
};

/**
 * welds several objects into new one
 * if one arg is given, it will be cloned
 * @returns {object}
 */
export function _weld(...args: any[]): Options {
  const res: Partial<Options> = {};
  for (let i = 0; i < arguments.length; i++) {
    let opts = arguments[i];
    if (!opts) continue;
    Object.keys(opts).forEach((key) => {
      res[key] = opts[key];
    });
  }
  return res as Options;
}
