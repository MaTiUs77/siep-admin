// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import Antd from 'vue-antd-ui'
import 'vue-antd-ui/dist/antd.css'
Vue.use(Antd)

import Selectbox from '@/components/Selectbox'
import LoginHeader from '@/components/LoginHeader'
import Select2 from '@/components/Select2'

Vue.component(Selectbox.name, Selectbox);
Vue.component(LoginHeader.name, LoginHeader);
Vue.component(Select2.name, Select2);


//import Antd from 'vue-antd-ui'
//import 'vue-antd-ui/dist/antd.css';  // or 'vue-antd-ui/dist/antd.less'
//import { Pagination, AutoComplete, Select, SelectOption } from 'vue-antd-ui';
//Vue.component(Pagination.name, Pagination)
//Vue.component(AutoComplete.name, AutoComplete)

/*Vue.use(Vuex);
const store = new Vuex.Store({
  strict: true,
  state: {
    user: {
      username: 'Matias Flores'
    }
  }
});
*/
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
//  store: store,
  router
})
