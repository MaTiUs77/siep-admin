<template>
<div>
    <select2 :options="options" v-model="selectedValue" style="width:100%;padding: 10px"/>
    <span class="help-block" v-if="error">{{ error }}</span>
    <a-button type="primary" icon="delete" @click="resetFilter" v-if="selectedValue" shape="circle" size="small"/>
<br>
<br>
</div>
</template>

<script>
  import axios from 'axios'

export default {
  name: 'siep-selectbox',
  data () {
    return {
      selected: 0,
      options: [],
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
    this.formOption();
  },
  methods: {
    formOption: function () {
      var vm = this;

      axios.get(this.$parent.apiForms +'/'+ vm.apiForm)
        .then(function (response) {
	let s2options = response.data.map(function(x) {
	   let obj = {
	    id: vm.prepareOptionValue(x),
	    text: vm.prepareOptionText(x)
	   }
	   return obj;
	});

	vm.options = s2options;
        })
        .catch(function (error) {
          vm.error = error.message;
        });
    },
    resetFilter() {
      this.selectedValue = null;
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
      this.resetFilter();
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

<style>
.select2-selection__rendered {
    line-height: 31px !important;
}
.select2-container .select2-selection--single {
    height: 35px !important;
}
.select2-selection__arrow {
    height: 34px !important;
}
</style>

