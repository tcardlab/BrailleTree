//import { mapState } from 'vuex'

/* eslint-disable  no-unused-vars */
//var mixin = {

/* export default {
  computed: {
    _$() {
      return this.$store.state
    }
  }
} */

/* import Vue from 'vue';
import Vue from 'vue';
import { mapState } from 'vuex';

export const mixin = {
    computed : mapState(['_$']),
};

Vue.mixin(mixin);
//https://stackoverflow.com/questions/49741130/declare-mapstate-and-mapmutations-globally-in-spa-vuejs
 */

import Vue from 'vue';
Vue.mixin({
  computed: {
    _$() {
      return this.$store.state["active"]
    }
  }
});
