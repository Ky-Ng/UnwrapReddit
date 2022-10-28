<template>
  <v-main
  class="ps-1 pb-2">

    <v-row class="mx-1">
        <redditSearch />

    </v-row>
    <v-row v-for="i in 2" :key="i" class="mx-0">
        <v-col v-for="j in 2" :key="j" cols="6">
          <BestTime />
        </v-col>
    </v-row>

    <v-row v-for="a in 2" :key="a" class="mx-0">
      <v-col v-for="b in 2" :key="b" cols="6">
        <DataGraph />
      </v-col>
    </v-row>

  </v-main>
</template>

<script>
import {fetchSubRedditPosts, redditPosts, getSubReddit, isBusy} from "@/parsers/parser";
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
  data: () => ({
    isParserBusy: isBusy,
  }),
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