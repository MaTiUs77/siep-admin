<template >
    <v-container fluid text-xs-center >
      <v-layout id="top" flex align-content-space-between justify-center >
        <v-flex class="scrollable-content" xs12 md6 lg5 xl5 >
            <v-flex xs12 md12 lg12 xl12>
              <v-text-field
                v-model="filtro.nombre"
                label="Busque por Nombre de Institución"
              ></v-text-field>
            </v-flex>

          <v-divider></v-divider>

          <div class="text-xs-center"><v-chip label>Si lo desea, además puede utilizar los filtros listados aquí debajo</v-chip></div>

            <v-combobox
                    v-model="filtro.ciudad"
                    :items="combo_ciudades"
                    label="Seleccione Ciudad"
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
            <div v-for="item in resultado">
                <v-card>
                    <v-divider></v-divider>
                    <v-list dense>
                      <h3 class="subheading mb-0 align-start"><strong>CUE: </strong>{{ item.cue }} - {{ item.nombre }}</h3>
                    </v-list>
                  <v-btn @click="showCenterInfo(item)" outline color="indigo">
                    Datos de Contacto
                  </v-btn>

                </v-card>
            </div>

          <!-- Modal -->
          <!--<v-dialog-->
            <!--v-model="dialog_ops.dialog"-->
            <!--max-width="490"-->
          <!--&gt;-->
            <!--<v-card>-->
              <!--<v-card-title class="headline">{{dialog_ops.dialogTitle}}</v-card-title>-->
              <!--<v-card-text>-->
                <!--<div>-->
                  <!--<strong>CUE:</strong> {{dialog_ops.dialogContent.cue}}-->
                <!--</div>-->
                <!--<div>-->
                  <!--<strong>Institución:</strong> {{dialog_ops.dialogContent.nombre}}-->
                <!--</div>-->
                <!--<div>-->
                  <!--<strong>Domicilio:</strong> {{dialog_ops.dialogContent.direccion}}-->
                <!--</div>-->
                <!--<div>-->
                  <!--<strong>Barrio:</strong> {{dialog_ops.dialogContent.barrio.nombre}}-->
                <!--</div>-->
                <!--<div>-->
                  <!--<strong>Código Postal:</strong> {{dialog_ops.dialogContent.cp}}-->
                <!--</div>-->
                <!--<div>-->
                  <!--<strong>Código Localidad:</strong> {{dialog_ops.dialogContent.codigo_localidad}}-->
                <!--</div>-->
                <!--<div>-->
                  <!--<strong>Ciudad:</strong> {{dialog_ops.dialogContent.ciudad.nombre}}-->
                <!--</div>-->
                <!--<div>-->
                  <!--<strong>Teléfono:</strong> {{dialog_ops.dialogContent.telefono}}-->
                <!--</div>-->
                <!--<div>-->
                  <!--<strong>Email:</strong> {{dialog_ops.dialogContent.email}}-->
                <!--</div>-->
                <!--<div>-->
                  <!--<strong>Url:</strong> {{dialog_ops.dialogContent.url}}-->
                <!--</div>-->
              <!--</v-card-text>-->
              <!--<v-card-actions>-->
                <!--<v-spacer></v-spacer>-->
                <!--<v-btn-->
                  <!--color="green darken-1"-->
                  <!--flat="flat"-->
                  <!--@click="dialog_ops.dialog = false"-->
                <!--&gt;Aceptar</v-btn>-->
              <!--</v-card-actions>-->
            <!--</v-card>-->
          <!--</v-dialog>-->
          <!-- /Modal -->

            <!--<v-card-text style="height: 100px; position: relative">-->
                <!--<v-fab-transition>-->
                    <!--<v-btn-->
                            <!--v-show="!hidden"-->
                            <!--color="primary"-->
                            <!--dark-->
                            <!--fixed-->
                            <!--bottom-->
                            <!--left-->
                            <!--fab-->
                            <!--@click="goTop"-->
                            <!--hint="Subir al Inicio"-->
                    <!--&gt;-->
                      <!--&lt;!&ndash; @click="$vuetify.goTo(target, options)" &ndash;&gt;-->
                        <!--<v-icon>vertical_align_top</v-icon>-->
                    <!--</v-btn>-->
                <!--</v-fab-transition>-->
            <!--</v-card-text>-->
        </v-flex>
        <!-- Google Maps -->
        <v-flex xs12 md6 lg6 xl6>
            <google-map :coords="coords" :markers_array="markers"/>
        </v-flex>
      </v-layout>
    </v-container>

</template>

<script>
  import router from '../router'
  import axios from 'axios'
  import * as easings from 'vuetify/es5/util/easing-patterns'

  // Modelo de Instituciones
  import instituciones from '../store/model/instituciones'
  import GoogleMap from "../components/GoogleMap";

  export default {
    components: {GoogleMap},
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

      combo_ciudades: ['Ushuaia','Tolhuin','Rio Grande'],
      combo_niveles: ['Común - Inicial','Común - Primario','Común - Secundario'],
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
      findInstitution: function () {
        var vm = this;
        vm.searching = true;

        const curl = axios.create({
          baseURL: vm.apigw
        });

        return curl.get('/api/v1/centros',{
          params: vm.filtro
        })
          .then(function (response) {
            let render = response.data.map(function(x) {
              let res ={
                position:{
                  lat: x.lng,
                  lng:x.lat
                }};
              if(x.lng != 0 || x.lat != 0){
                vm.markers.push(res);
              }
              return x;
            });

            vm.resultado = render;
            console.log(vm.resultado);
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
