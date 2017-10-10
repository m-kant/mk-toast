/* eslint-disable */

mktoast = {

    defaults: {
        position:   'right bottom',
        duration:   5000,
        type:       'default',
        message:    'empty'
    },

    getToastBoard(options) {
        let board = document.body.querySelector(`.mk-toast-board.mk-${options.xPosition}.mk-${options.yPosition}`);
        if (board) return board;

        board = document.createElement('div');
        board.className = `mk-toast-board mk-${options.xPosition} mk-${options.yPosition}`;
        document.body.appendChild(board);
        return board;
    },

    computePositionCssClasses(options) {
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

    print(options) {
        options = Object.assign( {}, this.defaults, options );
        this.computePositionCssClasses(options);
        options.boardEl = this.getToastBoard(options);

        // wrapper to handle animation
        const wrapperEl = document.createElement('div');
        wrapperEl.className = `mk-message-wrapper mk-hide`;

        // message with title and body
        const messageEl = document.createElement('div');
        messageEl.className = `mk-message mk-${options.type}`;
        wrapperEl.appendChild( messageEl );

        if(options.title){
            const titleEl = document.createElement('h2')
            titleEl.innerHTML = options.title;
            titleEl.className = 'mk-message-title';
            messageEl.appendChild( titleEl );
        }

        const bodyEl = document.createElement('div')
        bodyEl.innerHTML = options.message;
        bodyEl.className = 'mk-message-body';
        messageEl.appendChild( bodyEl );

        const closeEl = document.createElement('div')
        closeEl.className = 'mk-close';
        closeEl.onclick = () => {this.closeMessage(wrapperEl);} ;
        messageEl.appendChild( closeEl );
     
        wrapperEl.mktoast = options;
        this.appendMessage( wrapperEl );
        return wrapperEl;
    },

    height(el) { return el.clientHeight; },

    appendMessage(el){
        const options = el.mktoast;
        options.boardEl.appendChild(el);
        const elHeight =  this.height(el); 
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

    echo(message, title, options){
        options = options || {};
        options.message = message;
        options.title = title;
        options.type = 'default';
        return this.print(options);
    },
    danger(message, title, options){
        options = options || {};
        options.message = message;
        options.title = title;
        options.type = 'danger';
        return this.print(options);
    },
    success(message, title, options){
        options = options || {};
        options.message = message;
        options.title = title;
        options.type = 'success';
        return this.print(options);
    },
    warning(message, title, options){
        options = options || {};
        options.message = message;
        options.title = title;
        options.type = 'warning';
        return this.print(options);
    },
    info(message, title, options){
        options = options || {};
        options.message = message;
        options.title = title;
        options.type = 'info';
        return this.print(options);
    },
}

// export { Mktoast as default }