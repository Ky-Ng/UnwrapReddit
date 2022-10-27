<template>
  <v-main>
    <v-btn @click="test">
    fetch 10 reddit posts
    </v-btn>
    <v-btn @click="printArrValue">
      print values in response array to console
    </v-btn>
  </v-main>
</template>

<script>
import {printFromParser, getSubReddit, arrRes} from "@/parsers/parser";

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
    printArrValue(){
      console.log("from the arrRes");
      console.log(arrRes.length);
      arrRes.forEach(
          redditpost => console.log(redditpost.title)
      );
    },
  }
}
</script>

<style scoped>

</style>