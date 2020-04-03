
/**
 * Notifier to show different types of stacked messages at the side of screen
 * @type mktoast
 */
const mktoast = {

    defaults: {
        position:   'right bottom', // left|center|right top|bottom
        duration:    5000,			// milliseconds
        type:       'default',		// default|info|danger|success|warning
        message:    'empty',		// string or html of message
        container:   null,			// parent DOMElement of toast messages, default is body
    },

    _getToastBoard(options) {
        const container = options.container || document.body;
        let board = container.querySelector(`.mk-toast-board.mk-${options.xPosition}.mk-${options.yPosition}`);
        if (board) return board;

        board = document.createElement('div');
        board.className = `mk-toast-board mk-${options.xPosition} mk-${options.yPosition}`;
        container.appendChild(board);
        return board;
    },

    _computePositionCssClasses(options) {
        const position = options.position;

        if (position.indexOf('top') !== -1) {
            options.yPosition = 'top';
        } else {
            options.yPosition = 'bottom';
        }

        if(position.indexOf('left') !== -1){
            options.xPosition = 'left';
        } else if (position.indexOf('center') !== -1) {
            options.xPosition = 'center';
        }  else {
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
    print(options) {
        options = this._weld( this.defaults, options );
        this._computePositionCssClasses(options);
        options.boardEl = this._getToastBoard(options);

        // wrapper to handle animation
        const wrapperEl = this._newEl('div', 'mk-message-wrapper mk-hide');

        // message with title, body and close button
        const messageEl = this._newEl('div', `mk-message mk-${options.type}`);
        wrapperEl.appendChild( messageEl );

        if(options.title){
            messageEl.appendChild( 
				this._newEl('h2', 'mk-message-title', options.title) 
			);
        }

        messageEl.appendChild( 
			this._newEl('div', 'mk-message-body', options.message) 
		);

        const closeEl = this._newEl('div', 'mk-close');
        closeEl.onclick = () => {this.closeMessage(wrapperEl);} ;
        messageEl.appendChild( closeEl );
     
        wrapperEl.mktoast = options;
        this._appendMessage( wrapperEl );
        return wrapperEl;
    },
	
	_newEl(tagName, className, innerHtml){
		const el = document.createElement(tagName);
        if(className) el.className = className;
        if(innerHtml) el.innerHTML = innerHtml;
		return el;
	},
	
    _height(el) { return el.clientHeight; },

    _appendMessage(el){
        const options = el.mktoast;
        options.boardEl.appendChild(el);
        const elHeight =  this._height(el); 
        el.style.maxHeight = 0;

        // initiate appear transition
        setTimeout(() =>{ 
            el.className = el.className.replace(/mk-hide/,'');
            el.style.maxHeight = elHeight+'px';
        },10);
        // automatically remove node, when expires
        setTimeout(() =>{ this.closeMessage(el); }, options.duration);
    },
    closeMessage(el){
        if(el.disappearing) return;
        const options = el.mktoast;
        if(el.parentNode !== options.boardEl) return; // already removed
        
        el.disappearing = true;
        el.className += 'mk-hide ';
        el.style.maxHeight = 0;
        setTimeout(() =>{ options.boardEl.removeChild(el); },300);
    },
		
	// SYNTAX SUGAR, messages with predefined styles ---
	
    echo(message, title, options){
        if(!options && typeof title === 'object') { options = title; title = null; }
        return this.print( this._weld(options, {message, title, type: 'default'}) );
    },
    danger(message, title, options){
        if(!options && typeof title === 'object') { options = title; title = null; }
        return this.print( this._weld(options, {message, title, type: 'danger'}) );
    },
    error(message, title, options){
        return this.danger(message, title, options);
    },
    success(message, title, options){
        if(!options && typeof title === 'object') { options = title; title = null; }
        return this.print( this._weld(options, {message, title, type: 'success'}) );
    },
    warning(message, title, options){
        if(!options && typeof title === 'object') { options = title; title = null; }
        return this.print( this._weld(options, {message, title, type: 'warning'}) );
    },
    info(message, title, options){
        if(!options && typeof title === 'object') { options = title; title = null; }
        return this.print( this._weld(options, {message, title, type: 'info'}) );
    },
	
	// HELPERS ---
	
	/**
	 * welds several objects into new one
	 * if one arg is given, it will be cloned
	 * @returns {object}
	 */
	_weld(){
		const res = {};
		for(let i=0; i<arguments.length; i++){
			let opts = arguments[i];
			if(!opts) continue;
			Object.keys(opts).forEach( key => {res[key] = opts[key];});
		}
		return res;
	},
};
