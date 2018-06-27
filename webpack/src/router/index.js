var _ = require('lodash');

import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/sections/Home'
import rrhh_AlumnosNominal from '@/sections/rrhh/AlumnosNominal'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/rrhh/alumnos_nominal',
      name: 'rrhh_AlumnosNominal',
      component: rrhh_AlumnosNominal
    }
  ]
})
