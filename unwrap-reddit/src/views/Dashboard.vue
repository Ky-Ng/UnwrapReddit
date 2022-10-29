<template>
  <v-main
      class="ps-1 pb-2">
    <div v-if="renderedIn">
      <v-row class="mx-1">
        <redditSearch @update-subreddit="onRedditUpdate($event)"></redditSearch>
      </v-row>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col>
          <div class="indigo darken-1 text-center rounded">
            <span class="white--text">
              Analytics from <strong>r/{{ subRedName }}</strong> subreddit
            </span>
          </div>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>

      <v-row class="mx-0">
        <v-col cols="6">
          <v-card color="indigo lighten-2" class="pa-1">
            <BestDayCard :top-reddit-attribute="topAttribute"/>
            <DataGraph :xAxis="topAttribute"/>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card color="indigo lighten-2" class="pa-1">
            <BestDayCard :top-reddit-attribute="topAttribute"/>
            <DataGraph :xAxis="topAttribute"/>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mx-0">
        <v-col cols="6">

        </v-col>
        <v-col cols="6">
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <Loader :show="true"></Loader>
    </div>
  </v-main>
</template>

<script>
import Search from "@/components/user_input/Search";
import Graph from "@/components/graphs/Graph";
import BestDayCard from "@/components/best-attribute-cards/BestDayCard";
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
    subRedName: "dogs",
    topAttribute: null,
    graphData: null,
  }),

  methods: {
    async onRedditUpdate(subRedditName) {
      this.renderedIn = false;
      await safeFetchSubRedditPosts(subRedditName);
      this.renderedIn = true;
      this.topAttribute = Analytics.getTopThreeDays();
      this.subRedName = subRedditName;
    }
  },

  async beforeMount() {
    // load in dogs os default
    await safeFetchSubRedditPosts("dogs");
    this.renderedIn = true;
    this.topAttribute = Analytics.getTopThreeDays();
  },
}
</script>

<style scoped>

</style>