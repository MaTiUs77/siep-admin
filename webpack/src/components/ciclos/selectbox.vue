<template>
  <v-combobox
    v-model="select"
    :items="items"
    label="Seleccionar ciclo"
    dense
    box
    clearable
  ></v-combobox>
  </template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        apigw: process.env.SIEP_API_GW_INGRESS,
        form: 'ciclos',
        error: '',
        select: '',
        items: []
      }
    },
    created: function () {
      this.formOption();
    },
    methods: {
      formOption: function () {
        var vm = this;
        axios.get(vm.apigw+'/api/forms/'+vm.form)
        .then(function (response) {
          let render = response.data.map(function(x) {
            return x.nombre;
          });

          vm.items = render;
        })
        .catch(function (error) {
          vm.error = error.message;
        });
      }
    }
  }
</script>
