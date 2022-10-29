<template>
  <v-main
      class="ps-1 pb-2">
    <div v-if="renderedIn">
      <v-row class="mx-1">
        <redditSearch @update-subreddit="onRedditUpdate"></redditSearch>
      </v-row>

      <v-row v-for="i in 2" :key="i" class="mx-0">
        <v-col v-for="j in 2" :key="j" cols="6">
          <BestTime/>
        </v-col>
      </v-row>

      <v-row v-for="a in 2" :key="a" class="mx-0">
        <v-col v-for="b in 2" :key="b" cols="6">
          <DataGraph/>
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <Loader :show="true"></Loader>
    </div>
  </v-main>
</template>

<script>
import Search from "@/components/Search";
import Graph from "@/components/Graph";
import Highlight from "@/components/Highlight";
import {safeFetchSubRedditPosts} from "@/parsers/parser";
import Loader from "@/components/user_input/Loader";

export default {
  name: "Dashboard",
  components: {
    redditSearch: Search,
    DataGraph: Graph,
    BestTime: Highlight,
    Loader,
  },
  data: () => ({
    renderedIn: false,
  }),
  methods: {
    onRedditUpdate(){
      console.log("reddit update received in Dashboard")
    }
  },
  async beforeMount() {
    // load in dogs os default
    // this.disableSearch = true;
    console.log("this.firstRender =;" + this.renderedIn);
    await safeFetchSubRedditPosts("dogs");
    this.renderedIn = true;
    console.log("this.firstRender =" + this.renderedIn);
    // this.disableSearch = false;
  },
}
</script>

<style scoped>

</style>