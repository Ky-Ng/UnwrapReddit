<template>
  <v-toolbar
      dark
      color="orange darken-2"
      flat
      class="mr-3"
      rounded
  >
<!--    // todo remove
@keyup.enter="pushTargetSubRedditTitle"
-->
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
<!--    {{ formatSearch }}-->
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
      formatSearch: null,
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
      this.formatSearch = this.search == null ? '' : 'r/' + this.search;
      await isValidSubreddit(val)
      if (getIsValidSubReddit()){
        this.subredditTitles.push(val)
      }
      console.log("is valid subreddit for " + val + " is " + getIsValidSubReddit())
    },
    select(){
      console.log("select has changed to " + this.select)
      this.runMethod();
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.subredditTitles.filter(itemArrayElement => {
          return (itemArrayElement || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
    runMethod(){
      console.log("runnign in the methods function");
      this.pushTargetSubRedditTitle();
    },

    async pushTargetSubRedditTitle() {
      console.log("entered the pushTargetFunction")
      if (this.select == null) return;

      // format reddit post to have no whitespaces
      this.select = this.select.replace(/\s/g, "");
      this.select = this.select.replace("r/", "");

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