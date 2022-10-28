<template>
  <div>
    <redditSearch></redditSearch>
    <v-row v-for="n in 3" :key="n">
      <v-col cols="6">
        <DataGraph></DataGraph>
      </v-col>
      <v-col cols="3">
        <BestTime></BestTime>
      </v-col>
    </v-row>


  </div>
<!--    <v-row>-->

<!--      <v-btn @click="fetchPosts">-->
<!--        Fetch Reddit Posts-->
<!--      </v-btn>-->
<!--      <v-btn @click="printPostsToConsole">-->
<!--        Print Posts To Console-->
<!--      </v-btn>-->
<!--      <v-btn @click="printSubReddit('dogs')">-->
<!--        log whole subreddit-->
<!--      </v-btn>-->
<!--    </v-row>-->

</template>

<script>
import {fetchSubRedditPosts, redditPosts, getSubReddit} from "@/parsers/parser";
import Search from "@/components/Search";
import Graph from "@/components/Graph";
import Highlight from "@/components/Highlight";

export default {
  name: "Dashboard",
  components: {
    redditSearch: Search,
    DataGraph: Graph,
    BestTime: Highlight,
  },
  data: () => ({}),
  methods: {
    fetchPosts() {
      fetchSubRedditPosts();
    },
    printPostsToConsole() {
      console.log(redditPosts.length);
      redditPosts.forEach(
          redditpost => console.log(redditpost)
      );
    },
    printSubReddit(name) {
      getSubReddit(name)
    },
  }
}
</script>

<style scoped>

</style>