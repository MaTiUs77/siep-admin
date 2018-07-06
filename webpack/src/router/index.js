import Vue from 'vue'
import Router from 'vue-router'

import home from '@/pages/home'
import rrhh_alumnos_nominal from '@/pages/rrhh/alumnos_nominal'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/rrhh/alumnos_nominal',
      name: 'rrhh_alumnos_nominal',
      component: rrhh_alumnos_nominal
    }
  ]/*,
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }*/
})
