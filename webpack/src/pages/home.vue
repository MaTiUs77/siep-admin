<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <img src="@/assets/membretes-sup-edu.jpg" alt="SIEP" class="mb-5">
        <blockquote>
          "Sistema de Información Educativa Provincial."
          <footer>
            <small>
              <em>&mdash;Tierra del Fuego</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import router from '../router'

  export default{
    created: function(){
      console.log('page/home');
      store.commit('updateTitle',"SIEP | Admin");
    },
    computed:{
      user(){
        return store.state.user
      },
      persona(){
        return store.getters.persona;
      }
    }
  }
</script>
