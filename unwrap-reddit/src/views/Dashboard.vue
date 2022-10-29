<template>
  <v-main
      class="ps-1 pb-2">
    <div v-if="renderedIn">
      <v-row class="mx-1">
        <redditSearch @update-subreddit="onRedditUpdate"></redditSearch>
      </v-row>

      <v-row class="mx-0">
        <v-col cols="6">
          <BestDayCard :top-reddit-attribute="topAttribute"/>
        </v-col>
        <v-col cols="6">
          <BestDayCard :top-reddit-attribute="topAttribute"/>
        </v-col>
      </v-row>

      <v-row class="mx-0">
        <v-col cols="6">
          <DataGraph/>
        </v-col>
        <v-col cols="6">
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
import BestDayCard from "@/components/BestDayCard";
import {safeFetchSubRedditPosts} from "@/parsers/parser";
import Loader from "@/components/user_input/Loader";
import {Analytics} from "@/parsers/analytics";

export default {
  name: "Dashboard",
  components: {
    redditSearch: Search,
    DataGraph: Graph,
    BestDayCard,
    Loader,
  },
  data: () => ({
    renderedIn: false,
    topAttribute: null,
  }),

  methods: {
    onRedditUpdate() {
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
    // this.topAttribute = {
    //   percentage: -5, 1: {stringDay: "no day"}
    // };
    this.topAttribute = Analytics.getTopThreeDays();

  },
}
</script>

<style scoped>

</style>