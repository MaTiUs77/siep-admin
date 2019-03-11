// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// Google Maps
import * as VueGoogleMaps from "vue2-google-maps";

// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import _ from 'lodash';

// Source
import router from './router'
import store from './store'

Vue.use(Vuetify);

// Vue.use(VuetifyGoogleAutocomplete, {
//   apiKey: 'AIzaSyBFPUFES_l4Gn4QKty9nwXTdeM-Ew-Hxb8' // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
// });

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBFPUFES_l4Gn4QKty9nwXTdeM-Ew-Hxb8",
    libraries: "places" // necessary for places input
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
