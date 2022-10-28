<template>
  <div class="text-center">
    <v-dialog
        v-model="show"
        hide-overlay
        persistent
        width="300"
    >
      <v-card
          color="orange darken-3"
          dark
          class="pt-4"
      >
        <v-card-text>
          Fetching your <i>{{ randWord }}</i> Reddit Data
          <v-progress-linear
              indeterminate
              color="white"
              class="my-0 pt-0"
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
      niceAdj: ['beautiful', 'wonderful', 'meaningful', 'amazing', 'insightful'],
      randWord: null,
    }
  },
  props:{
    show: Boolean,
  },
  watch:{
    show(){
      this.randWord = this.niceAdj[Math.floor(Math.random() * this.niceAdj.length)];
    }
  }
}
</script>

<style scoped>

</style>