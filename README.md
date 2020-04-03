# mk-toast

Library agnostic notifier with Vue.js connector. Mobile friendly and compact. Smooth CSS animation with no twitching.

![screenshot](https://github.com/m-kant/mk-toast/blob/master/mktoast-demo.gif?raw=true)

[Demo and details](http://mkant.ru/mink-js/mk-toast)

## Installation

```bash
 npm install --save mk-toast
 ```

## Inclusion

### Browser

```HTML
<link  href="nodes_modules/mk-toast/dist/mk-toast.min.css" rel="stylesheet">
<script src="nodes_modules/mk-toast/dist/mk-toast.min.js"></script>
```

### Build systems

```JavaScript
var mktoast = require('mk-toast'); // reads es5 version
// or 
import mktoast from 'mk-toast'; // this will take es6 module
```

Don't forget to include css styles

### Vue.js

To use it anywhere inside components (without inclusion in every file), add in main.js:

```JavaScript
import mktoast from 'mk-toast/vue';
Vue.use(mktoast);
```

You don't have to include styles in this case, 'cos styles are already included in Vue connector.

Then in any vue component you can use `this.$mktoast`:

```JavaScript
this.$mktoast.echo(message [,title] [,options]);
this.$mktoast.success(message [,title] [,options]);
...
```

To use it in a router or vuex, which does not have vue context, use regular es6 approach:

```JavaScript
import mktoast from 'mk-toast';
mktoast.echo('your message');
```

## Usage

```JavaScript
mktoast.echo(message [,title] [,options]);
mktoast.success(message [,title] [,options]);
mktoast.danger(message [,title] [,options]);
mktoast.warning(message [,title] [,options]);
mktoast.info(message [,title] [,options]);
 
// most universal usage
mktoast.print(options);
```

## Options

option | type | default | comment
------ | ---- | ------- | -------
position | string | 'right bottom' | Positioning of mktoast: left center right  top bottom
duration | milliseconds | 5000 | Time to keep toast message on screen
container | DOMElement | null | Parent DOMElement of toast messages, default is body
type | string | 'default' | Used only in mktoast.print(). Types of message: default, info, danger, success, warning.
message | string | 'empty' | Used only in mktoast.print(). String or html code of message.
title | string | undefined | Used only in mktoast.print(). String of toast title.

---

[Demo and details](http://mkant.ru/mink-js/mk-toast)
