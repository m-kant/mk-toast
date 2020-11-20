/** For use in bundlers/browsers in a form of UMD */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.mktoast = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /** get HTMLElement of board for all messages (different boards at different cornerers of screen) */
    function _getToastBoard(options) {
        var container = options.container || document.body;
        var board = container.querySelector(".mktoast__board.mk-" + options.xPosition + ".mk-" + options.yPosition);
        if (board)
            return board;
        board = document.createElement('div');
        board.className = "mktoast__board mk-" + options.xPosition + " mk-" + options.yPosition;
        container.appendChild(board);
        return board;
    }
    function _computePositionCssClasses(options) {
        var xoptions = options;
        var position = options.position;
        if (position.indexOf('top') !== -1) {
            xoptions.yPosition = 'top';
        }
        else {
            xoptions.yPosition = 'bottom';
        }
        if (position.indexOf('left') !== -1) {
            xoptions.xPosition = 'left';
        }
        else if (position.indexOf('center') !== -1) {
            xoptions.xPosition = 'center';
        }
        else {
            xoptions.xPosition = 'right';
        }
        return xoptions;
    }
    function _newEl(tagName, className, innerHtml) {
        if (className === void 0) { className = ''; }
        if (innerHtml === void 0) { innerHtml = ''; }
        var el = document.createElement(tagName);
        if (className)
            el.className = className;
        if (innerHtml)
            el.innerHTML = innerHtml;
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
        if (el.disappearing)
            return;
        var options = el.mktoast;
        if (el.parentNode !== options.boardEl)
            return; // already removed
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
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var res = {};
        var _loop_1 = function (i) {
            var opts = arguments_1[i];
            if (!opts)
                return "continue";
            Object.keys(opts).forEach(function (key) {
                res[key] = opts[key];
            });
        };
        var arguments_1 = arguments;
        for (var i = 0; i < arguments.length; i++) {
            _loop_1(i);
        }
        return res;
    }

    var defaults = {
        position: 'right bottom',
        duration: 5000,
        type: 'default',
        title: '',
        message: 'Attention',
        container: null,
    };
    /**
     * Places toast message into DOM.
     * Easier to use syntax sugar - mktoast.echo(message) and so on.
     * @param {object} options rewrites defaults for individual message
     * @returns {HTMLElement}
     */
    function print(opts) {
        opts = _weld(this.defaults, opts);
        var options = _computePositionCssClasses(opts);
        options.boardEl = _getToastBoard(options);
        // wrapper to handle animation
        var wrapperEl = _newEl('div', 'mktoast-message__wrapper mk-hide');
        // message with title, body and close button
        var messageEl = _newEl('div', "mktoast-message mktoast-message_" + options.type);
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
        return wrapperEl;
    }
    // SYNTAX SUGAR, messages with predefined styles ---
    function _echoArgsToOptions(type, message, title, options) {
        // if title is an option indeed
        if (typeof title === 'object') {
            options = title;
            title = null;
        }
        return __assign(__assign({}, options), { message: message, title: title, type: type });
    }
    var echo = function (message, title, options) {
        return this.print(_echoArgsToOptions('default', message, title, options));
    };
    var danger = function (message, title, options) {
        return this.print(_echoArgsToOptions('danger', message, title, options));
    };
    var success = function (message, title, options) {
        return this.print(_echoArgsToOptions('success', message, title, options));
    };
    var warning = function (message, title, options) {
        return this.print(_echoArgsToOptions('warning', message, title, options));
    };
    var info = function (message, title, options) {
        return this.print(_echoArgsToOptions('info', message, title, options));
    };
    /**
     * Publish stacked messages at the side of screen
     * @type mktoast
     */
    var mkToast = {
        defaults: defaults,
        closeMessage: _closeMessage,
        danger: danger,
        echo: echo,
        /** Alias for danger */
        error: danger,
        info: info,
        print: print,
        success: success,
        /** Alias for success */
        ok: success,
        warning: warning,
        /** Alias for warning */
        warn: warning,
    };

    return mkToast;

})));
