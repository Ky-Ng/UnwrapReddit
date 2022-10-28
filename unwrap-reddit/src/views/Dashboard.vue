<template>
  <v-main
  class="ps-1 pb-2">
    <v-row class="pt-3">
      <redditSearch></redditSearch>
    </v-row>
<!--    <v-row>-->
<!--      <v-col v-for="i in 3" :key="i">-->
<!--        <v-card v-if="i==2">-->
<!--          <v-card-title align="end">-->
<!--            r/FTC-->
<!--          </v-card-title>-->
<!--        </v-card>-->
<!--      </v-col>-->
<!--    </v-row>-->
    <v-row v-for="i in 2" :key="i" class="mx-0">
        <v-col v-for="j in 2" :key="j" cols="6">
          <BestTime></BestTime>
        </v-col>
    </v-row>

    <v-row v-for="a in 2" :key="a" class="mx-0">
      <v-col v-for="b in 2" :key="b" cols="6">
        <DataGraph></DataGraph>
      </v-col>
    </v-row>



  </v-main>
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