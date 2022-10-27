<template>
  <v-main>
    <v-row>
      <v-col>
        <!--        <redditSearch></redditSearch>-->
      </v-col>
      <v-btn @click="fetchPosts">
        fetch 10 reddit posts
      </v-btn>
      <v-btn @click="printArrValue">
print titles      </v-btn>
    </v-row>

  </v-main>
</template>

<script>
import {getSubReddit, arrRes} from "@/parsers/parser";
// import Search from "@/components/Search";

export default {
  name: "Dashboard",
  components: {
    // redditSearch: Search,
  },
  data: () => ({}),
  methods: {
    fetchPosts() {
      getSubReddit();
    },
    printArrValue() {
      console.log(arrRes.length)
      arrRes.forEach(
          redditpost => console.log(redditpost)
      );
    },
  }
}
</script>

<style scoped>

</style>