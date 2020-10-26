# mk-toast

Library agnostic notifier with Vue.js connector.
Mobile friendly and compact.
Smooth CSS animation with no twitching.
Typings are included for TypeScript integration and better IDE experience.

![screenshot](https://github.com/m-kant/mk-toast/blob/master/mktoast-demo.gif?raw=true)

[Demo and details](http://mkant.ru/mink-js/mk-toast)

## Installation

```bash
 npm install --save mk-toast
```

## Inclusion

### Build systems

```JavaScript
import mktoast from 'mk-toast';
// Don't forget to include css styles from 'mk-toast/dist/mk-toast.css'
```

### Browser

```HTML
<link  href="nodes_modules/mk-toast/dist/mk-toast.min.css" rel="stylesheet">
<script src="nodes_modules/mk-toast/dist/mk-toast.min.js"></script>
```

## Usage

```JavaScript
mktoast.echo   (message [,title] [,options]);
mktoast.success(message [,title] [,options]);
mktoast.danger (message [,title] [,options]);
mktoast.warning(message [,title] [,options]);
mktoast.info   (message [,title] [,options]);

// most universal usage
mktoast.print(options);
```

## Vue.js

To use it anywhere inside components (without inclusion in every file), add in main.js:

```JavaScript
import mktoastVue from 'mk-toast/vue';
Vue.use(mktoastVue);
```

You don't have to include styles in this case, 'cos styles are already included in Vue connector.

Then inside vue component you can use `this.$mktoast`:

```JavaScript
this.$mktoast.echo(message);
```

To use it outside of componets (in vuex actions, for example), use regular es6 approach:

```JavaScript
import mktoast from 'mk-toast';
mktoast.echo('your message');
```

<!-- If any problems with build systems, which does not allow css imports use `import mktoast from 'mk-toast/vue/require';`, and include css separately. -->

## Options

| option    | type         | default        | comment                                                                                  |
| --------- | ------------ | -------------- | ---------------------------------------------------------------------------------------- |
| position  | string       | 'right bottom' | Positioning of mktoast: left center right top bottom                                     |
| duration  | milliseconds | 5000           | Time to keep toast message on screen                                                     |
| container | HTMLElement  | null           | Parent HTMLElement of toast messages, default is document.body                           |
| type      | string       | 'default'      | Used only in mktoast.print(). Types of message: default, info, danger, success, warning. |
| message   | string       | 'empty'        | Used only in mktoast.print(). String or html code of message.                            |
| title     | string       | undefined      | Used only in mktoast.print(). String of toast title.                                     |

---

[Demo with playground](http://mkant.ru/mink-js/mk-toast)
