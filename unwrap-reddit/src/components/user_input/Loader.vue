<template>
  <div class="text-center">
    <v-btn
        :disabled="show"
        :loading="show"
        class="white--text"
        color="purple darken-2"
    >
      Start loading
    </v-btn>
    <v-dialog
        v-model="show"
        hide-overlay
        persistent
        width="300"
    >
      <v-card
          color="primary"
          dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  name: "Loader",
  data () {
    return {
    }
  },
  props:{
    show: Boolean,
  },

  watch: {
    dialog (val) {
      if (!val) return

      setTimeout(() => (this.dialog = false), 4000)
    },
  },
}
</script>

<style scoped>

</style>