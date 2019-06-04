<template>
  <v-app>
    <section v-if="!maintenanceMode">
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
        <v-spacer></v-spacer>
        <v-btn v-on:click="logout()" color="blue-grey darken-2" v-if="logged" dark >
          <v-icon>power_settings_new</v-icon>
          Cerrar Sesion
        </v-btn>
      </v-toolbar>

      <!-- CONTENIDO DE NAVEGACION !-->
      <v-content>
        <router-view/>
      </v-content>
      <!-- FIN CONTENIDO DE NAVEGACION !-->
    </section>
    <section v-if="maintenanceMode">
      <article>
          <h1>Estarémos de vuelta muy pronto!</h1>
          <div>
              <p>Disculpe las molestias, estamos trabajando en el sitio en este momento. Si es necesario, puede contactarnos al correo <a href="mailto:#">sinide.tdf@gmail.com</a>, de igual manera, estaremos de nuevo online muy pronto!</p><br>
              <p style="text-align:left !important;">&mdash; Equipo de SIEP</p>
          </div>
      </article>
    </section>
    <v-footer
      height="auto"
      color="primary lighten-1"
    >
      <v-flex
        text-xs-center
        white--text
        xs12
      >
        &copy; 2019 — <strong>Subsecretaría de Planeamiento Educativo, Informática y Evaluación</strong>
      </v-flex>
    </v-footer>
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
        toolbar_disabled:true,
        maintenanceMode: false
      }
    },
    computed: {
      menu_toolbar() {
        return store.state.menu_toolbar;
      },
      user() {
        return store.state.login_api.user
      },
      logged() {
        return store.state.login_api.loggedIn;
      }
    },
    created(){
      console.log('APP Created');
      store.dispatch('LOGIN_API_fetchUserRemember');
      this.verifyHost();
    },
    methods: {
      logout() {
        store.dispatch('LOGIN_API_logout');
      },
      verifyHost(){
        if(window.location.hostname.includes('admin.sieptdf')){
          this.maintenanceMode = true;
        }else{
          console.log(window.location.hostname);
          this.maintenanceMode = false;
        }
      }
    },
    name: 'App'
  }
</script>
