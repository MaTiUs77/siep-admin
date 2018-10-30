<template>
  <v-app>

    <!-- MENU DE NAVEGACION !-->
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <!-- Componente UserSidebar -->
      <user-sidebar />
      <v-divider></v-divider>
      <!-- Componente MenuSidebar -->
      <menu-sidebar />

    </v-navigation-drawer>
    <!-- FIN MENU DE NAVEGACION !-->

    <!-- Menu toolbar !-->
    <v-toolbar app :color="menu_toolbar.header_color" dark >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="menu_toolbar.title" ></v-toolbar-title>
    </v-toolbar>

    <!-- CONTENIDO DE NAVEGACION !-->
    <v-content>
      <router-view/>
    </v-content>
    <!-- FIN CONTENIDO DE NAVEGACION !-->

  </v-app>
</template>

<script>
  import MenuSidebar from './components/menu_sidebar'
  import UserSidebar from './components/user_sidebar'

  export default {
    components :{ MenuSidebar, UserSidebar },
    data () {
      return {
        drawer: false,
        toolbar_disabled:true
      }
    },
    computed: {
      menu_toolbar() {
        return store.state.menu_toolbar;
      }
    },
    created(){
      console.log('APP Created');
      store.dispatch('LOGIN_API_fetchUserRemember');
    },
    methods: {
    },
    name: 'App'
  }
</script>
