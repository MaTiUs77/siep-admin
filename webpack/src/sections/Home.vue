<template>
<div>
  <h1>Bienvenido a SiepAdmin</h1>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
    	response:[],
      modo: null
    }
  },
  created: function () {
  },
  methods: {
  }
}
</script>
