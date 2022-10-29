<template>
  <v-main
      class="ps-1 pb-2">
    <div v-if="renderedIn">
      <v-row class="mx-1">
        <redditSearch @update-subreddit="onRedditUpdate($event)"></redditSearch>
      </v-row>
      <v-row>
<!--        <v-card flat>-->
<!--          <v-col cols="9"></v-col>-->
<!--          <v-col cols="">-->
<!--            <v-card-title class="text-center align-center">-->
<!--              r/Dogs-->
<!--            </v-card-title>-->
<!--          </v-col>-->
<!--          <v-col cols="3"></v-col>-->
<!--        </v-card>-->
        <v-col cols="1"></v-col>
        <v-col>
        <div class="indigo darken-1 text-center rounded" >
          <span class="white--text">"{{ topAttribute.subredditName }}"</span>
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
            <GraphCard :top-reddit-attribute="topAttribute"/>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mx-0">
        <v-col cols="6">

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
import Graph from "@/components/graphs/Graph";
import BestDayCard from "@/components/best-attribute-cards/BestDayCard";
import {safeFetchSubRedditPosts} from "@/parsers/parser";
import Loader from "@/components/user_input/Loader";
import {Analytics} from "@/parsers/analytics";
import GraphCard from "@/components/best-attribute-cards/GraphCard";

export default {
  name: "Dashboard",
  components: {
    redditSearch: Search,
    DataGraph: Graph,
    BestDayCard,
    Loader,
    GraphCard,
  },
  data: () => ({
    renderedIn: false,

    topAttribute: {frequencyDays: 'every never day'},
    graphData: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, -1],
  }),

  methods: {
    async onRedditUpdate(subRedditName) {
      // this.renderedIn = false;
      // setTimeout(() => {
      //   console.log("Delayed for 1 second.");
      // }, "1000")
      // this.topAttribute = Analytics.getTopThreeDays();
      // this.renderedIn = true;
      // console.log("updating topAttribute")
      // console.log("top attribute is ")
      // console.log(this.topAttribute)
      this.renderedIn = false;
      await safeFetchSubRedditPosts(subRedditName);
      this.renderedIn = true;
      this.topAttribute = Analytics.getTopThreeDays();
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