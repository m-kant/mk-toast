
// 1. import 'vue' before declaring augmented types
import Vue, { PluginFunction, PluginObject } from 'vue'
import mktoast, { Mktoast } from "../src/mk-toast"; // get Typed from src
// import mktoast from 'mk-toast';


// 2. Augument Vue with additional property
//    Vue has the constructor type in types/vue.d.ts
declare module "vue/types/vue" {
  // 3. Declare augmentation for Vue
  interface Vue {
    $mktoast: typeof mktoast;
  }
}


// Vue Plugin definition
// necessery for Vue.use() to accept MktoastVue as valid argument
export interface MktoastVuePlugin extends PluginObject<Mktoast.Options> {
  install: PluginFunction<Mktoast.Options>
}
export declare const MktoastVue: MktoastVuePlugin
export default MktoastVue;
