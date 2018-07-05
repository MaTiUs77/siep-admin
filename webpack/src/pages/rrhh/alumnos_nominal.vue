<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs9>
          <table-alumnos-nominal/>
      </v-flex>
      <v-flex xs3>
          <select-ciclos/>
          <select-ciudades/>
          <select-centros/>
          <select-sectores/>
          <select-niveles/>
          <select-anios/>
          <select-divisiones/>
          <select-turnos/>
          <select-tipos/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import SelectCentros from '../../components/centros/selectbox'
  import SelectCiclos from '../../components/ciclos/selectbox'
  import SelectCiudades from '../../components/ciudades/selectbox'
  import SelectSectores from '../../components/sectores/selectbox'
  import SelectNiveles from '../../components/niveles/selectbox'
  import SelectAnios from '../../components/anios/selectbox'
  import SelectDivisiones from '../../components/divisiones/selectbox'
  import SelectTurnos from '../../components/turnos/selectbox'
  import SelectTipos from '../../components/tipos/selectbox'

  import TableAlumnosNominal from '../../components/table_alumnos_nominal'

  export default {
    components :{
      SelectCentros,
      SelectCiclos,
      SelectCiudades,
      SelectSectores,
      SelectNiveles,
      SelectAnios,
      SelectDivisiones,
      SelectTurnos,
      SelectTipos,
      TableAlumnosNominal,
    },
    data () {
      return {
        wizard: 1
      }
    }
  }
</script>
