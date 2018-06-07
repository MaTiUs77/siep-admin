<template>
<div>

  <div class="row">

    <div class="col-md-9">
      <div class="box box-solid box-default">
        <div class="box-header with-border">
          <h3 class="box-title">Alumnos nominal</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <table class="table">
            <thead>
            <tr>
              <th>Centro</th>
              <th>Nivel de servicio</th>
              <th>Nombre</th>
              <th>Dni</th>
              <th>Año</th>
              <th>Division</th>
              <th>Turno</th>
              <th>Fecha Alta</th>
              <th>Fecha Baja</th>
              <th>Fecha Egreso</th>
            </tr>
            </thead>
            <tbody v-if="!loading">
            <tr v-for="item in datatable">
              <td>{{ item.centro }}</td>
              <td>{{ item.nivel_servicio }}</td>
              <td>{{ item.nombre_completo}}</td>
              <td>{{ item.dni }}</td>
              <td>{{ item.año }}</td>
              <td>{{ item.division }}</td>
              <td>{{ item.turno }}</td>
              <td>{{ item.fecha_alta }}</td>
              <td>{{ item.fecha_baja }}</td>
              <td>{{ item.fecha_egreso }}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="box-footer clearfix">
          <ul class="pagination pagination-sm">
            <li v-for="num in pagination.render" :class="{active : pagination.current_page == num}">
              <a href="javascript:;" v-on:click="aplicarFiltro(num)">{{ num }}</a>
            </li>
          </ul>
        </div>

        <div class="overlay" v-if="loading">
          <i class="fa fa-refresh fa-spin"></i>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="box box-solid box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">Opciones</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">

          <h5>Filtrar Ciclo</h5>
          <siep-selectbox :filter="filtro" name="ciclo" api-form="ciclos" option-text="nombre"></siep-selectbox>

          <h5>Filtrar Centro</h5>
          <siep-selectbox :filter="filtro" name="ciudad" api-form="ciudades" option-text="nombre"></siep-selectbox>
          <siep-selectbox :filter="filtro" name="sector" api-form="sectores"></siep-selectbox>
          <siep-selectbox :filter="filtro" name="nivel_servicio" api-form="niveles"></siep-selectbox>

          <h5>Filtrar Curso</h5>
          <siep-selectbox :filter="filtro" name="anio" api-form="años"></siep-selectbox>
          <siep-selectbox :filter="filtro" name="division" api-form="divisiones"></siep-selectbox>
          <siep-selectbox :filter="filtro" name="turno" api-form="turnos"></siep-selectbox>
          <siep-selectbox :filter="filtro" name="tipo" api-form="tipos" ></siep-selectbox>

          <button class="btn btn-success btn-block" v-on:click="aplicarFiltro">Aplicar filtros</button>
          <button class="btn btn-danger btn-block" v-on:click="filtro = {}">Remover filtros</button>

        </div>
      </div>
      <!-- /.box -->
    </div>

  </div>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AlumnosNominal',
  data () {
    return {
      datatable: [],
      pagination: [],
      filtro: {
        ciclo: 2018
      },

      apiUrl: 'http://172.17.0.1:3000/api',
      apiForms: 'http://172.17.0.1:3000/api/forms',

      loading: true,
      error: ''
    }
  },
  created: function () {
    this.nominalAlumnosInscriptos();
  },
  methods: {
    aplicarFiltro: function (num) {
      if(num) { this.filtro.page = num; }
      this.nominalAlumnosInscriptos();
    },
    renderPagination: function() {
      var vm = this;
      vm.pagination.render =  _.range(1,vm.pagination.last_page+1);
    },
    nominalAlumnosInscriptos: function () {
      var vm = this;
      vm.loading = true;

      axios.get(vm.apiUrl+'/dependencia/rrhh/nominal_alumnos_inscriptos',{
        params: vm.filtro
      })
      .then(function(response){

        /*                        // Formatea el array, genera un agrupamiento por categoria.nombre
         self.data = _.transform(response.data, function(result, item, key) {
         (result[item.nombre] || (result[item.nombre] = [])).push(item);
         }, {});*/

        vm.datatable = response.data.data;
        vm.pagination = _.omit(response.data,'data');
        vm.renderPagination();

        vm.loading = false;
      })
        .catch(function (error) {
          vm.error = error.message;
          vm.loading = false;
        });
    }
  }
}
</script>
