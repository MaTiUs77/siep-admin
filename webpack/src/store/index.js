import Vue from 'vue'
import Vuex from 'vuex'

import menu from './model/menu'
import menu_toolbar from './model/menu_toolbar'

import user from './model/user'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    menu: menu,
    menu_toolbar: menu_toolbar,

    user: user
  }
})

export default store
window.store = store
