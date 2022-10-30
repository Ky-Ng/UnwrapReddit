<template>
  <v-main
      class="ps-1 pb-2">
    <div v-if="renderedIn">

      <v-row class="mx-1">
        <Search @update-subreddit="onRedditUpdate($event)"></Search>
      </v-row>

      <SubRedditTitle :sub-reddit-name="subRedName"></SubRedditTitle>

      <v-row class="mx-0">
        <v-col cols="6">
          <v-card color="indigo lighten-2" class="pa-1">
            <DataCard :subRedditAnalyticsCategory="subRedditAnalytics.weekday"></DataCard>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card color="indigo lighten-2" class="pa-1">
            <DataCard :subRedditAnalyticsCategory="subRedditAnalytics.hours"></DataCard>
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
import {safeFetchSubRedditPosts} from "@/parsers/parser";
import Loader from "@/components/user_input/Loader";
import {Analytics} from "@/parsers/analytics";
import SubRedditTitle from "@/components/user_input/SubRedditTitle";
import DataCard from "@/components/DataDisplay/DataCard";

export default {
  name: "Dashboard",
  components: {
    Search,
    Loader,
    SubRedditTitle,
    DataCard,
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