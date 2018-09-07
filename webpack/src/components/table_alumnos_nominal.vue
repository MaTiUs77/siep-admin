<template>
  <div>

    <v-chip
      class="ml-0"
      label
      small
    >
      Inscripciones: {{ response.total || 'Sin resultados' }}
    </v-chip>

    <!-- Descargar excel -->
    <v-menu
            :disabled="excel.download"
        open-on-hover offset-y max-height="200">
        <v-btn
          slot="activator"
          color="green"
          small
          dark
          :loading="excel.download"
        >
        <v-icon left dark>cloud_download</v-icon>
        Descargar excel
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="parte in excel.partes"
          :key="parte"
          @click.native="startDownload(parte)"
        >
          <v-list-tile-title>Parte: {{ parte }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-snackbar
      v-model="excel.snackbar"
      color="red darken-4"
    >
      Error: {{ excel.error_message }}
      <v-btn
        dark
        flat
        @click="excel.snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
    <!-- ./Descargar excel -->

    <!-- Datatable -->
    <v-data-table
      :headers="headers"
      :items="response.data"
      :loading="loading"
      no-data-text="No hay datos"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.centro }}</td>
        <td class="text-xs-right">{{ props.item.nivel_servicio }}</td>
        <td class="text-xs-right">{{ props.item.nombre_completo }}</td>
        <td class="text-xs-right">{{ props.item.dni }}</td>
        <td class="text-xs-right">{{ props.item.año }}</td>
        <td class="text-xs-right">{{ props.item.division }}</td>
        <td class="text-xs-right">{{ props.item.turno }}</td>
        <td class="text-xs-right">{{ props.item.fecha_alta }}</td>
        <td class="text-xs-right">{{ props.item.fecha_baja }}</td>
        <td class="text-xs-right">{{ props.item.fecha_egreso }}</td>
      </template>
    </v-data-table>
    <!-- ./Datatable -->
    <br>

    <!-- Pagination -->
    <p class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="response.last_page"
        :total-visible="7"
      />
    </p>
    <!-- ./Pagination -->

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: ['query'],
    data () {
      return {
        headers: [
          { text: 'Centro', value: 'centro', sortable: false  },
          { text: 'Nivel de servicio', value: 'nivel_servicio' , sortable: false },
          { text: 'Nombre', value: 'nombre_completo' , sortable: false },
          { text: 'DNI', value: 'dni' , sortable: false },
          { text: 'Año', value: 'año' , sortable: false },
          { text: 'Division', value: 'division' , sortable: false },
          { text: 'Turno', value: 'turno' , sortable: false },
          { text: 'Fecha Alta', value: 'fecha_alta' , sortable: false },
          { text: 'Fecha Baja', value: 'fecha_baja' , sortable: false },
          { text: 'Fecha Egreso', value: 'fecha_egreso' , sortable: false },
        ],
        response: [],

        excel: {
          download: false,
          error: false,
          error_message: false,
          snackbar: false,
          limite: 3000,
          partes: 0
        },

        apigw: process.env.SIEP_API_GW_INGRESS,
        page: 1,
        loading: true,
        error: false,
        error_message: ''
      }
    },
    created: function () {
      this.getData();
    },
    watch: {
      page: function() {
        this.query.page = this.page;
        this.getData();
      },
      query: {
        handler() {
          // Cada vez que cambia la query, retorno a la primer pagina
          this.page = 1;
          this.getData();
        },
        deep: true
      }
    },
    methods: {
      getData() {
        let vm = this;
        vm.loading = true;
        vm.error = false;

        vm.scrollToTop();

        axios.get(vm.apigw+'/api/dependencia/rrhh/nominal_alumnos_inscriptos',{
          params: vm.query
        })
        .then(function (response) {
          vm.response = response.data;
          vm.loading = false;

          if(vm.response.total) {
            vm.excel.partes = Math.ceil(vm.response.total / vm.excel.limite);
          }
        })
        .catch(function (error) {
          vm.error = true;
          vm.error_message = error.message;
          vm.loading = false;
        });
      },
      startDownload(parte) {
        let vm = this;
        vm.excel.download = true;
        vm.excel.error= false;

        let download= JSON.parse(JSON.stringify(vm.query));
        download.export = 1;
        download.page = parte;
        download.por_pagina = vm.excel.limite;

        axios.get(vm.apigw+'/api/dependencia/rrhh/nominal_alumnos_inscriptos',{
          params: download,
          responseType: 'blob'
        })
        .then(function (response) {
          vm.excel.download= false;
          vm.excel.error= false;

          // Descarga EXCEL con AJAX (permite crear loading)
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'RRHH_AlumnosNominal_'+download.page+'.xlsx');
          document.body.appendChild(link);
          link.click();
        })
        .catch(function (error) {
          vm.excel.download= false;
          vm.excel.error= true;
          vm.excel.error_message= error.message;
          vm.excel.snackbar = true;
        });
      },
      scrollToTop() {
        window.scrollTo(0,0);
      }
    }
  }
</script>
