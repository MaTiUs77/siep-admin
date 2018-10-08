import Vue from 'vue'
import Router from 'vue-router'

// Paginas
import login from '@/pages/login'
import home from '@/pages/home'
import rrhh_alumnos_nominal from '@/pages/rrhh/alumnos_nominal'
import matriculas_cuantitativa_por_seccion from '@/pages/matriculas/cuantitativa_por_seccion'
import instituciones from '@/pages/instituciones'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/rrhh/alumnos_nominal',
      name: 'rrhh_alumnos_nominal',
      component: rrhh_alumnos_nominal
    },
    {
      path: '/matriculas/cuantitativa/por_seccion',
      name: 'matriculas_cuantitativa_por_seccion',
      component: matriculas_cuantitativa_por_seccion
    },
    {
      path:'/instituciones',
      name:'instituciones',
      component: instituciones
    }
  ]/*,
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }*/
})
