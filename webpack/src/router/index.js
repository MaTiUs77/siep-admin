import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'

import RRHH_AlumnosNominal from '@/pages/rrhh/alumnos_nominal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/rrhh/alumnos_nominal',
      name: 'RRHH_AlumnosNominal',
      component: RRHH_AlumnosNominal
    }
  ]/*,
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }*/
})
