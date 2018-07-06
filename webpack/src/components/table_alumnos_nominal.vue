<template>
  <div>
    <v-chip
      class="ml-0"
      label
      small
    >
      Inscripciones: {{ response.total || 'Sin resultados' }}
    </v-chip>

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
    <br>

    <p class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="response.last_page"
        :total-visible="7"
      />
    </p>

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
      getData: function() {
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
        })
        .catch(function (error) {
          vm.error = true;
          vm.error_message = error.message;
          vm.loading = false;
        });
      },
      scrollToTop: function() {
        window.scrollTo(0,0);
      }
    }
  }
</script>
