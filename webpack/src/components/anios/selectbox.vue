<template>
  <v-combobox
    dense
    box
    clearable
    height="50"
    v-model="select"
    label="Seleccionar año"
    :items="items"
    :loading="loading"
    :error="error"
    :error-messages="error_message"
  ></v-combobox>
  </template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        apigw: process.env.SIEP_API_GW_INGRESS,
        form: 'años',
        select: '',
        items: [],

        loading: true,
        error: false,
        error_message: '',
      }
    },
    created: function () {
      this.formOption();
    },
    methods: {
      formOption: function () {
        var vm = this;
        vm.loading = true;
        vm.error = false;

        axios.get(vm.apigw+'/api/forms/'+vm.form)
        .then(function (response) {
          let render = response.data.map(function(x) {
            return x.anio;
          });

          vm.items = render;
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
