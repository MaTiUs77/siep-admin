<template >
    <v-container fluid text-xs-center >
      <v-layout id="top" flex row wrap align-content-space-between justify-center >
        <v-flex class="scrollable-content" xs12 sm12 md5 lg5 xl5 mb-2>
            <v-flex xs12 md12 lg12 xl12>
              <!-- <v-text-field
                v-model="filtro.nombre"
                label="Busque por Nombre de Institución"
              ></v-text-field> -->
              <select-api-forms 
              v-model="filtro.nombre" 
              form="centros" 
              label="Busque por Nombre de Institución" 
              custom="nombre"/>
            </v-flex>

          <v-divider xs12 md12 lg12 xl12></v-divider>

          <!-- <div xs12 md12 lg12 xl12 class="text-xs-center"><v-chip label>Si lo desea, además puede utilizar los filtros listados aquí debajo</v-chip></div> -->
          <v-flex xs12 sm12 md12 lg12 xl12 mt-1>
            <div class="text-center">
              <p ligth>Si lo desea, además puede utilizar los filtros listados aquí debajo</p>
            </div>
          </v-flex>

            <v-combobox
                    v-model="filtro.ciudad"
                    :items="combo_ciudades_api"
                    :loading="combo_ciudades_searching"
                    label="Seleccione Ubicación"
            ></v-combobox>

            <v-combobox
                    v-model="filtro.nivel_servicio"
                    :items="combo_niveles"
                    label="Seleccione Nivel"
            ></v-combobox>

            <v-combobox
                    v-model="filtro.sector"
                    :items="combo_sectores"
                    label="Seleccione Sector"
            ></v-combobox>

            <v-container>
                <v-btn
                        class="mx-0"
                        color="primary"
                        @click="findInstitution"
                        :loading="searching"
                >
                    <v-icon left large>search</v-icon>Buscar
                </v-btn>
            </v-container>


            <!-- Resultados de busqueda -->
            <div v-for="item in resultado" :key="item.id">
                <v-card>
                    <v-divider></v-divider>
                    <v-list dense>
                      <h3 class="subheading mb-0 align-start"><strong>CUE Anexo: </strong>{{ item.cue }} - {{ item.nombre }}</h3>
                    </v-list>
                  <v-btn @click="showCenterInfo(item)" outline color="indigo">
                    Ver En Mapa
                  </v-btn>

                </v-card>
            </div>

        </v-flex>
        <!-- Google Maps -->
        <v-flex xs12 sm12 md7 lg7 x7>
          <google-map :coords="coords" :markers_array="markers"/>
        </v-flex>
      </v-layout>
    </v-container>

</template>

<script>
  import router from '../router'
  import axios from 'axios'
  import * as easings from 'vuetify/es5/util/easing-patterns'


  import SelectApiForms from '../components/apiforms/selectbox'
  // Modelo de Instituciones
  import instituciones from '../store/model/instituciones'

  // Google Maps
  import GoogleMap from "../components/GoogleMap";

  export default {
    components: { GoogleMap, SelectApiForms },
    mounted: function(){
      this.fillLocations();
    },
    created: function(){
      store.commit('updateTitle',"SIEP | Instituciones");
    },
    data: ()=>({

      coords:{
        latitud: -68.2746,
        longitud: -68.3186003,
      },
      markers:[],
      type: 'number',
      number: 9999,
      selector: '#top',
      selected: 'Button',
      elements: ['Button', 'Radio group'],
      duration: 300,
      offset: 0,
      easing: 'easeInOutCubic',
      easings: Object.keys(easings),
      error:"",
      searching:false,
      headers:['Nombre'],
      hidden:false,
      apigw: process.env.SIEP_API_GW_INGRESS,
      filtro:{},
      resultado:[],
      findCentroRunning:false,
      centro_nombre:"",
      combo_ciudades_api:[],
      combo_ciudades_searching:false,
      combo_niveles: ['Maternal - Inicial','Común - Inicial','Común - Primario','Adultos - Primario','Común - Secundario','Adultos - Secundario'],
      combo_sectores:["ESTATAL","PRIVADO"],
      dialog_ops:{
        dialog: false,
        buttonName:"",
        dialogTitle:"Información del Centro",
        dialogContent:instituciones,
        icon:"visibility"
  }
    }),
    computed:{
      target () {
        const value = 0;
        if (!isNaN(value)) return Number(value)
        else return value
      },
      options () {
        return {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing
        }
      },
      element () {
        if (this.selected === 'Button') return this.$refs.button
        else if (this.selected === 'Radio group') return this.$refs.radio
      }
    },
    methods:{

      fillLocations: function() {
        var vm = this;
        const curl = axios.create({
          baseURL: vm.apigw
        });
        vm.combo_ciudades_searching = true;
        return curl.get('/api/forms/ciudades')
          .then(function (response) {
            vm.combo_ciudades_api  = response.data.map(x => {
              return x.nombre
            });
            vm.combo_ciudades_searching = false;
          })
          .catch(function (error) {
            vm.error = error.message;
            // vm.loading_nivel = false;
            console.log(vm.error);
            vm.searching = false;
            vm.combo_ciudades_searching = false;
          });
      },

      findInstitution: function () {
        var vm = this;
        vm.searching = true;
        vm.markers = [];

        const curl = axios.create({
          baseURL: vm.apigw
        });
        vm.filtro.with='barrio,cursos.titulacion';
        return curl.get('/api/v1/centros',{
          params: _.omitBy(vm.filtro, _.isEmpty)
        })
          .then(function (response) {
            let render = response.data.map(function(x) {
              let res ={
                position:{
                  lat: x.lng,
                  lng: x.lat
                },
                data:x
              };
              if(x.lng != 0 && x.lat != 0 && !isNaN(x.lng) && !isNaN(x.lat)){
                vm.markers.push(res);
              }
              return x;
            });

            vm.resultado = render;
            vm.searching = false;
          })
          .catch(function (error) {
            vm.error = error.message;
            vm.loading_nivel = false;
            console.log(vm.error);

            vm.searching = false;
          });
      },

      findInstitutionByName:function(){
        var vm = this;
      },

      showCenterInfo(centro){
        let vm = this;
        vm.coords ={
          latitud: centro.lng,
          longitud: centro.lat
        };
      },

      goBack:function(){
        router.go(-1);
      },

      goTop:function(){
        var element = document.getElementById("top");
        var top = element.offsetTop;
        element.scrollTo(0,0);
      },

      verifyFilters:function(){
        this.filtro = _.remove(this.filtro , function(f){
          return f.isNaN
        })
      }
    }
  }
</script>

<style scoped>

  .scrollable-content {
    height: 500px;
    background: white;
    flex-grow: 1;

    overflow: auto;

    /* for Firefox */
    min-height: 0;
  }


</style>
