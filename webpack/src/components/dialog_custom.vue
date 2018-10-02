<template>

    <v-dialog
            v-model="dialog_.dialog.dialog"
            max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Hpñaaaa</v-card-title>
        <v-card-text>
          contenido
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
                  color="green darken-1"
                  flat="flat"
                  @click="dialog_.dialog.dialog = false"
          >Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
  export default {
    props:['dialog'],
    data () {
      return {
        dialog_: this.props
      }

    },
    created: function() {
      // console.log(this.props);
    },
    methods: {
    }
  }
</script>
