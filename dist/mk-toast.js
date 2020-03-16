
if(typeof exports === 'object' && typeof module !== 'undefined'){
	module.exports = mktoast;
};

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Notifier to show different types of stacked messages at the side of screen
 * @type mktoast
 */
var mktoast = {
  defaults: {
    position: 'right bottom',
    // left|center|right top|bottom
    duration: 5000,
    // milliseconds
    type: 'default',
    // default|info|danger|success|warning
    message: 'empty',
    // string or html of message
    container: null // parent DOMElement of toast messages, default is body

  },
  _getToastBoard: function _getToastBoard(options) {
    var container = options.container || document.body;
    var board = container.querySelector(".mk-toast-board.mk-".concat(options.xPosition, ".mk-").concat(options.yPosition));
    if (board) return board;
    board = document.createElement('div');
    board.className = "mk-toast-board mk-".concat(options.xPosition, " mk-").concat(options.yPosition);
    container.appendChild(board);
    return board;
  },
  _computePositionCssClasses: function _computePositionCssClasses(options) {
    var position = options.position;

    if (position.indexOf('top') !== -1) {
      options.yPosition = 'top';
    } else {
      options.yPosition = 'bottom';
    }

    if (position.indexOf('left') !== -1) {
      options.xPosition = 'left';
    } else if (position.indexOf('center') !== -1) {
      options.xPosition = 'center';
    } else {
      options.xPosition = 'right';
    }

    return options;
  },

  /**
   * Places toast message into DOM.
   * Easier to use syntax sugar - mktoast.echo(message) and so on.
   * @param {object} options rewrites defaults for individual message
   * @returns {DOMElement}
   */
  print: function print(options) {
    var _this = this;

    options = this._weld(this.defaults, options);

    this._computePositionCssClasses(options);

    options.boardEl = this._getToastBoard(options); // wrapper to handle animation

    var wrapperEl = this._newEl('div', 'mk-message-wrapper mk-hide'); // message with title, body and close button


    var messageEl = this._newEl('div', "mk-message mk-".concat(options.type));

    wrapperEl.appendChild(messageEl);

    if (options.title) {
      messageEl.appendChild(this._newEl('h2', 'mk-message-title', options.title));
    }

    messageEl.appendChild(this._newEl('div', 'mk-message-body', options.message));

    var closeEl = this._newEl('div', 'mk-close');

    closeEl.onclick = function () {
      _this.closeMessage(wrapperEl);
    };

    messageEl.appendChild(closeEl);
    wrapperEl.mktoast = options;

    this._appendMessage(wrapperEl);

    return wrapperEl;
  },
  _newEl: function _newEl(tagName, className, innerHtml) {
    var el = document.createElement(tagName);
    if (className) el.className = className;
    if (innerHtml) el.innerHTML = innerHtml;
    return el;
  },
  _height: function _height(el) {
    return el.clientHeight;
  },
  _appendMessage: function _appendMessage(el) {
    var _this2 = this;

    var options = el.mktoast;
    options.boardEl.appendChild(el);

    var elHeight = this._height(el);

    el.style.maxHeight = 0; // initiate appear transition

    setTimeout(function () {
      el.className = el.className.replace(/mk-hide/, '');
      el.style.maxHeight = elHeight + 'px';
    }, 10); // automatically remove node, when expires

    setTimeout(function () {
      _this2.closeMessage(el);
    }, options.duration);
  },
  closeMessage: function closeMessage(el) {
    if (el.disappearing) return;
    var options = el.mktoast;
    if (el.parentNode !== options.boardEl) return; // already removed

    el.disappearing = true;
    el.className += 'mk-hide ';
    el.style.maxHeight = 0;
    setTimeout(function () {
      options.boardEl.removeChild(el);
    }, 300);
  },
  // SYNTAX SUGAR, messages with predefined styles ---
  echo: function echo(message, title, options) {
    if (!options && _typeof(title) === 'object') {
      options = title;
      title = null;
    }

    return this.print(this._weld(options, {
      message: message,
      title: title,
      type: 'default'
    }));
  },
  danger: function danger(message, title, options) {
    if (!options && _typeof(title) === 'object') {
      options = title;
      title = null;
    }

    return this.print(this._weld(options, {
      message: message,
      title: title,
      type: 'danger'
    }));
  },
  error: function error(message, title, options) {
    return this.danger(message, title, options);
  },
  success: function success(message, title, options) {
    if (!options && _typeof(title) === 'object') {
      options = title;
      title = null;
    }

    return this.print(this._weld(options, {
      message: message,
      title: title,
      type: 'success'
    }));
  },
  warning: function warning(message, title, options) {
    if (!options && _typeof(title) === 'object') {
      options = title;
      title = null;
    }

    return this.print(this._weld(options, {
      message: message,
      title: title,
      type: 'warning'
    }));
  },
  info: function info(message, title, options) {
    if (!options && _typeof(title) === 'object') {
      options = title;
      title = null;
    }

    return this.print(this._weld(options, {
      message: message,
      title: title,
      type: 'info'
    }));
  },
  // HELPERS ---

  /**
   * welds several objects into new one
   * if one arg is given, it will be cloned
   * @returns {object}
   */
  _weld: function _weld() {
    var _arguments = arguments;
    var res = {};

    var _loop = function _loop(i) {
      var opts = _arguments[i];
      if (!opts) return "continue";
      Object.keys(opts).forEach(function (key) {
        res[key] = opts[key];
      });
    };

    for (var i = 0; i < arguments.length; i++) {
      var _ret = _loop(i);

      if (_ret === "continue") continue;
    }

    return res;
  }
};