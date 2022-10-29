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
        label="r/anything"
        :disabled=disableSearch
        rounded
        solo-inverted
        color="white"
    ></v-autocomplete>
  </v-toolbar>
</template>

<script>
import {getIsValidSubReddit, isValidSubreddit} from "@/parsers/parser";

export default {
  name: "Search",
  data() {
    return {
      disableSearch: false,
      items: [],
      search: null,
      select: null,
      subredditTitles: [
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
      this.$emit('update-subreddit', this.select);
    }
  },
}
</script>

<style scoped>

</style>