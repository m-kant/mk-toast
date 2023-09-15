/** For use in bundlers/browsers in a form of UMD */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.mktoast = factory());
})(this, (function () { 'use strict';

  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  /** get HTMLElement of board for all messages (different boards at different cornerers of screen) */
  function _getToastBoard(options) {
    var container = options.container || document.body;
    var board = container.querySelector(".mktoast__board.mk-".concat(options.xPosition, ".mk-").concat(options.yPosition));
    if (board) return board;
    board = document.createElement('div');
    board.className = "mktoast__board mk-".concat(options.xPosition, " mk-").concat(options.yPosition);
    container.appendChild(board);
    return board;
  }
  function _computePositionCssClasses(options) {
    var xoptions = options;
    var position = options.position;
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
  function _newEl(tagName) {
    var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var innerHtml = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var el = document.createElement(tagName);
    if (className) el.className = className;
    if (innerHtml) el.innerHTML = innerHtml;
    return el;
  }
  function _height(el) {
    return el.clientHeight;
  }
  function _appendMessage(el) {
    var options = el.mktoast;
    options.boardEl.appendChild(el);
    var elHeight = _height(el);
    el.style.maxHeight = 0;
    // initiate appear transition
    setTimeout(function () {
      el.className = el.className.replace(/mk-hide/, '');
      el.style.maxHeight = elHeight + 'px';
    }, 10);
    // automatically remove node, when expires
    setTimeout(function () {
      _closeMessage(el);
    }, options.duration);
  }
  function _closeMessage(el) {
    if (el.disappearing) return;
    var options = el.mktoast;
    if (el.parentNode !== options.boardEl) return; // already removed
    el.disappearing = true;
    el.className += 'mk-hide ';
    el.style.maxHeight = 0;
    setTimeout(function () {
      options.boardEl.removeChild(el);
    }, 300);
  }
  /**
   * welds several objects into new one
   * if one arg is given, it will be cloned
   * @returns {object}
   */
  function _weld() {
    var _arguments = arguments;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var res = {};
    var _loop = function _loop() {
      var opts = _arguments[i];
      if (!opts) return 1; // continue
      Object.keys(opts).forEach(function (key) {
        res[key] = opts[key];
      });
    };
    for (var i = 0; i < arguments.length; i++) {
      if (_loop()) continue;
    }
    return res;
  }

  var defaults = {
    position: 'right bottom',
    duration: 5000,
    type: 'default',
    title: '',
    message: 'Attention',
    container: null // parent HTMLElement of toast messages, default is body
  };
  /**
   * Publish toast message into the board
   * Creates board if it does not exists and mounts it into document
   * @param opts overrides defaults for individual message
   */
  function print(opts) {
    opts = _weld(this.defaults, opts);
    var options = _computePositionCssClasses(opts);
    options.boardEl = _getToastBoard(options);
    // wrapper to handle animation
    var wrapperEl = _newEl('div', 'mktoast-message__wrapper mk-hide');
    // message with title, body and close button
    var messageEl = _newEl('div', "mktoast-message mktoast-message_".concat(options.type));
    wrapperEl.appendChild(messageEl);
    if (options.title) {
      messageEl.appendChild(_newEl('h2', 'mktoast-message__title', options.title));
    }
    messageEl.appendChild(_newEl('div', 'mktoast-message__body', options.message));
    var closeEl = _newEl('div', 'mk-close');
    closeEl.onclick = function () {
      _closeMessage(wrapperEl);
    };
    messageEl.appendChild(closeEl);
    wrapperEl.mktoast = options;
    _appendMessage(wrapperEl);
    return {
      el: messageEl,
      wrapperEl: wrapperEl,
      boardEl: options.boardEl
    };
  }
  // SYNTAX SUGAR, messages with predefined styles ---
  function _echoArgsToOptions(type, message, title, options) {
    // if title is an option indeed
    if (title && _typeof(title) === 'object') {
      options = title;
      title = null;
    }
    return _objectSpread2(_objectSpread2({}, options), {}, {
      message: message,
      title: title,
      type: type
    });
  }
  /** Publish default neutral gray color message */
  var echo = function echo(message, title, options) {
    return this.print(_echoArgsToOptions('default', message, title, options));
  };
  /** Publish red color message */
  var danger = function danger(message, title, options) {
    return this.print(_echoArgsToOptions('danger', message, title, options));
  };
  /** Publish green color message */
  var success = function success(message, title, options) {
    return this.print(_echoArgsToOptions('success', message, title, options));
  };
  /** Publish orange color message */
  var warning = function warning(message, title, options) {
    return this.print(_echoArgsToOptions('warning', message, title, options));
  };
  /** Publish blue color message */
  var info = function info(message, title, options) {
    return this.print(_echoArgsToOptions('info', message, title, options));
  };
  /**
   * Publish stacked notifications at the side of screen
   */
  var mkToast = {
    defaults: defaults,
    closeMessage: _closeMessage,
    /** Publish red color message */
    danger: danger,
    /** Publish default neutral gray color message */
    echo: echo,
    /** Alias for danger */
    error: danger,
    /** Publish blue color message */
    info: info,
    /**
    * Publish toast message into the board
    * Creates board if it does not exists and mounts it into document
    * @param opts overrides defaults for individual message
    */
    print: print,
    /** Publish green color message */
    success: success,
    /** Alias for success */
    ok: success,
    /** Publish orange color message */
    warning: warning,
    /** Alias for warning */
    warn: warning
  };

  return mkToast;

}));
