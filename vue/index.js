/** bridge to Vue.js for easy usage in components 
 *  without multiply imports in every file.
 *  In App.vue in style segment add: 
 *    @import "../node_modules/mk-toast/dist/mk-toast.css";
 *  In main.js add:
 *    import mktoast from 'mk-toast/vue';
 *    Vue.use(mktoast);
 *  In any Vue component use as this:
 *    this.$toast.echo(message)
 */

import mktoast from '../dist/mk-toast';
// import mktoastStyles from './mk-toast-styles';

const Toast = {

  install(Vue, toastDefaults = {}) {
    Object.assign(mktoast.defaults, toastDefaults);
    // Vue.component('mktoastStyles', mktoastStyles);
    Vue.prototype.$mktoast = mktoast;
  }

};

export default Toast;
