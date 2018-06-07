<template>
<div>
  <div class="form-group" :class="{ 'has-success' : selectedValue, 'has-error' : computedError }" style="margin:0">
    <select class="form-control" v-model="selectedValue">
      <option :value="null">- Seleccionar {{ name }} -</option>
      <option v-for="item in lista" :value="prepareOptionValue(item)" v-text="prepareOptionText(item)"></option>
    </select>
    <span class="help-block" v-if="error">{{ error }}</span>
  </div>
  <a href="javascript:;" class="pull-right" v-if="selectedValue" @click="resetFilter">remover</a>
  <br>
</div>
</template>

<script>
  import axios from 'axios'

export default {
  name: 'siep-selectbox',
  data () {
    return {
    	lista:[],
      error: null,
      selectedValue: null
    }
  },
  props: [
    'filter',
    'apiForm',
    'name',
    'optionText',
    'optionValue'
  ],
  created: function () {
    this.makeFilter();
    this.formOption();
  },
  methods: {
    formOption: function () {
      var vm = this;
      axios.get(this.$parent.apiForms +'/'+ vm.apiForm)
        .then(function (response) {
          vm.lista = response.data;
        })
        .catch(function (error) {
          vm.error = error.message;
        });
    },
    resetFilter() {
      this.selectedValue = null;
    },
    makeFilter() {
      /*// Si no existe el filtro, crea el objeto
      if(!this.filter[this.name]) {
        this.filter[this.name] = null;
      }*/

//      this.optionSelected = this.filter[this.name];
    },
    prepareOptionText(item) {
      return (this.optionText ? item[this.optionText] : item[this.name]);
    },
    prepareOptionValue(item) {
      if(this.optionValue)
      {
        return item[this.optionValue];
      } else
      {
        return (this.optionText ? item[this.optionText] : item[this.name]);
      }
    }
  },
  watch: {
    filter: function(newVal, oldVal) {
      this.selectedValue = null;
    },
    selectedValue: function(newVal, oldVal) {
      this.filter[this.name] = newVal;
    }
  },
  computed: {
    computedError() {
      return this.error;
    }/*,
    computedValue: {
      get () {
        return this.filter[this.name];
      },
      set (optionValue) {
        this.filter[this.name] = optionValue;
        return this.filter[this.name] ;
      }
    }*/
  }
}
</script>
