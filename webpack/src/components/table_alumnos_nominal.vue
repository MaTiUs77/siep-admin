<template>
  <v-data-table
          :headers="headers"
          :items="items"
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
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        apigw: process.env.SIEP_API_GW_INGRESS,
        headers: [
          { text: 'Centro', value: 'centro' },
          { text: 'Nivel de servicio', value: 'nivel_servicio' },
          { text: 'Nombre', value: 'nombre_completo' },
          { text: 'DNI', value: 'dni' },
          { text: 'Año', value: 'año' },
          { text: 'Division', value: 'division' },
          { text: 'Turno', value: 'turno' },
          { text: 'Fecha Alta', value: 'fecha_alta' },
          { text: 'Fecha Baja', value: 'fecha_baja' },
          { text: 'Fecha Egreso', value: 'fecha_egreso' },
        ],
        items: [],
        loading: true,
        error: false,
        error_message: ''
      }
    },
    created: function () {
      this.getData();
    },
    methods: {
      getData: function() {
        let vm = this;
        vm.loading = true;
        vm.error = false;

        axios.get(vm.apigw+'/api/dependencia/rrhh/nominal_alumnos_inscriptos?ciclo=2018')
        .then(function (response) {
          vm.items = response.data.data;
          vm.loading = false;
        })
        .catch(function (error) {
          vm.error = true;
          vm.error_message = error.message;
          vm.loading = false;
        });
      }
    }
  }
</script>
