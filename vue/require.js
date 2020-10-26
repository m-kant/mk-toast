/** bridge to Vue.js for non-webpack old build systems
 */

var mktoast = require("../dist/mk-toast");

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
