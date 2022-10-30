<template>
  <v-main class="ps-1 pb-2 mt-1">

    <div v-if="renderedIn">
      <v-row class="mx-1 pt-3"><Search @update-subreddit="onRedditUpdate($event)"></Search></v-row>

      <SubRedditTitle :sub-reddit-name="subRedName" class="pt-1 pb-0"></SubRedditTitle>

      <DataDisplay :subRedditAnalytics="subRedditAnalytics"></DataDisplay>
    </div>

    <div v-else>
      <Loader :show="true"></Loader>
    </div>
  </v-main>
</template>

<script>
import Search from "@/components/user_input/Search";
import {safeFetchSubRedditPosts} from "@/parsers/parser";
import Loader from "@/components/user_input/Loader";
import {Analytics} from "@/parsers/analytics";
import SubRedditTitle from "@/components/user_input/SubRedditTitle";
import DataDisplay from "@/components/DataDisplay/DataDisplay";

export default {
  name: "Dashboard",
  components: {
    Search,
    Loader,
    SubRedditTitle,
    DataDisplay,
  },
  data: () => ({
    renderedIn: false,
    subRedName: "dogs",
    subRedditAnalytics: null,
    graphData: null,
  }),

  methods: {
    async onRedditUpdate(subRedditName) {
      this.renderedIn = false;
      await safeFetchSubRedditPosts(subRedditName);
      this.renderedIn = true;
      this.subRedditAnalytics = Analytics.getAnalytics();
      this.subRedName = subRedditName;
    }
  },

  async beforeMount() {
    // load in dogs os default
    await safeFetchSubRedditPosts("dogs");
    this.renderedIn = true;
    this.subRedditAnalytics = Analytics.getAnalytics();
  },
}
</script>

<style scoped>

</style>