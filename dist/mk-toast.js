/** For use in bundlers/browsers in a form of UMD */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.mktoast = factory());
}(this, (function () { 'use strict';

    /**
     * Publish stacked messages at the side of screen
     * @type mktoast
     */
    var mktoast = {
        defaults: {
            position: 'right bottom',
            duration: 5000,
            type: 'default',
            message: 'empty',
            container: null,
        },
        /** get HTMLElement of board for all messages (different boards at different cornerers of screen) */
        _getToastBoard: function (options) {
            var container = options.container || document.body;
            var board = container.querySelector(".mk-toast-board.mk-" + options.xPosition + ".mk-" + options.yPosition);
            if (board)
                return board;
            board = document.createElement('div');
            board.className = "mk-toast-board mk-" + options.xPosition + " mk-" + options.yPosition;
            container.appendChild(board);
            return board;
        },
        _computePositionCssClasses: function (options) {
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
        },
        /**
         * Places toast message into DOM.
         * Easier to use syntax sugar - mktoast.echo(message) and so on.
         * @param {object} options rewrites defaults for individual message
         * @returns {HTMLElement}
         */
        print: function (opts) {
            var _this = this;
            opts = this._weld(this.defaults, opts);
            var options = this._computePositionCssClasses(opts);
            options.boardEl = this._getToastBoard(options);
            // wrapper to handle animation
            var wrapperEl = this._newEl('div', 'mk-message-wrapper mk-hide');
            // message with title, body and close button
            var messageEl = this._newEl('div', "mk-message mk-" + options.type);
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
        _newEl: function (tagName, className, innerHtml) {
            if (className === void 0) { className = ''; }
            if (innerHtml === void 0) { innerHtml = ''; }
            var el = document.createElement(tagName);
            if (className)
                el.className = className;
            if (innerHtml)
                el.innerHTML = innerHtml;
            return el;
        },
        _height: function (el) {
            return el.clientHeight;
        },
        _appendMessage: function (el) {
            var _this = this;
            var options = el.mktoast;
            options.boardEl.appendChild(el);
            var elHeight = this._height(el);
            el.style.maxHeight = 0;
            // initiate appear transition
            setTimeout(function () {
                el.className = el.className.replace(/mk-hide/, '');
                el.style.maxHeight = elHeight + 'px';
            }, 10);
            // automatically remove node, when expires
            setTimeout(function () {
                _this.closeMessage(el);
            }, options.duration);
        },
        closeMessage: function (el) {
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
        },
        // SYNTAX SUGAR, messages with predefined styles ---
        echo: function (message, title, options) {
            if (!options && typeof title === 'object') {
                options = title;
                title = null;
            }
            return this.print(this._weld(options, { message: message, title: title, type: 'default' }));
        },
        // echo(message, title, options) {
        //   if (!options && typeof title === 'object') { options = title; title = null; }
        //   return this.print(this._weld(options, { message, title, type: 'default' }));
        // },
        danger: function (message, title, options) {
            if (!options && typeof title === 'object') {
                options = title;
                title = null;
            }
            return this.print(this._weld(options, { message: message, title: title, type: 'danger' }));
        },
        error: function (message, title, options) {
            return this.danger(message, title, options);
        },
        success: function (message, title, options) {
            if (!options && typeof title === 'object') {
                options = title;
                title = null;
            }
            return this.print(this._weld(options, { message: message, title: title, type: 'success' }));
        },
        warning: function (message, title, options) {
            if (!options && typeof title === 'object') {
                options = title;
                title = null;
            }
            return this.print(this._weld(options, { message: message, title: title, type: 'warning' }));
        },
        info: function (message, title, options) {
            if (!options && typeof title === 'object') {
                options = title;
                title = null;
            }
            return this.print(this._weld(options, { message: message, title: title, type: 'info' }));
        },
        // HELPERS ---
        /**
         * welds several objects into new one
         * if one arg is given, it will be cloned
         * @returns {object}
         */
        _weld: function () {
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
        },
    };

    return mktoast;

})));
