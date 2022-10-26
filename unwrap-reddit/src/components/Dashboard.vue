<template>
  <v-main>
    <v-btn @click="test">
      "click this button"
    </v-btn>
  </v-main>
</template>

<script>
import {printFromParser, getSubReddit} from "@/parsers/parser";

export default {
  name: "Dashboard",
  data: () => ({

  }),
  methods: {
    test(s) {
      console.log("saying hi from dashboard" + s)
      printFromParser();
      getSubReddit();
    },
  }
}
</script>

<style scoped>

</style>