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
import "../dist/mk-toast.css"; // for bundlers like webpack or rollup

const Toast = {
  install: function (Vue, toastDefaults) {
    Object.assign(mktoast.defaults, toastDefaults);
    Vue.prototype.$mktoast = mktoast;
  }
};

export default Toast;
