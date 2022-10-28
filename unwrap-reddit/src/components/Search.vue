<template>
  <v-toolbar
      dark
      color="orange darken-2"
      flat
      class="mr-3"
      rounded
  >
    <v-autocomplete
        prepend-icon="mdi-magnify"
        v-model="select"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        hide-no-data
        hide-details
        label="r/search anything"
        :disabled=disableSearch
        rounded
        solo-inverted
        color="white"
    ></v-autocomplete>
    <Loader v-bind:show="disableSearch"></Loader>
  </v-toolbar>
</template>

<script>
import {safeFetchSubRedditPosts, printPostTitle, getIsValidSubReddit, isValidSubreddit} from "@/parsers/parser";
import Loader from "@/components/user_input/Loader";

export default {
  name: "Search",
  components: {
    Loader,
  },
  data() {
    return {
      disableSearch: false,
      items: [],
      search: null,
      select: null,
      subredditTitles: [
        'dogs',
        'cats',
        'games'
      ],
    }
  },
  watch: {
    async search(val) {
      val && val !== this.select && this.querySelections(val)
      // Add any valid typed reddit posts to the list, ensures that pushSelectSubRedditTitle only fetches valid subreddits
      await isValidSubreddit(val)
      if (getIsValidSubReddit()) {
        this.subredditTitles.push(val)
      }
    },

    // after the user selects a valid subReddit from the autocomplete
    select() {
      this.pushSelectSubRedditTitle()
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      this.items = this.subredditTitles
      console.log("search value is " + v);
    },

    async pushSelectSubRedditTitle() {
      // Show Loading Screen while fetching the posts
      this.disableSearch = true;
      await safeFetchSubRedditPosts(this.select);
      this.disableSearch = false;

      //todo console log remove
      printPostTitle();
    }
  },
}
</script>

<style scoped>

</style>