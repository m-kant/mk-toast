/** bridge to Vue.js for easy usage in components
 *  without multiply imports in every file.
 *  Intended for build systems as webpack
 * 
 *  In main.js add:
 *    import mktoast from "mk-toast/vue";
 *    Vue.use(mktoast);
 * 
 *  In any Vue component use as this:
 *    this.$toast.echo(message)
 */

import mktoast from "../dist/mk-toast";
import "../dist/mk-toast.css"; // for webpack

var Toast = {
  /* pure ES6 works well in Dev mode, but leads to error during Build.
     so had to change func definition from "func(){}" to "func: function(){}"
     had to remove default argument value "func(a=10)"
  */
  install: function (Vue, toastDefaults) {
    Object.assign(mktoast.defaults, toastDefaults);
    Vue.prototype.$mktoast = mktoast;
  }
};

export default Toast;
