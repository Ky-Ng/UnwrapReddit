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
import {safeFetchSubRedditPosts, printPostTitle} from "@/parsers/parser";
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
    search(val) {
      val && val !== this.select && this.querySelections(val)
      this.formatSearch = this.search == null ? '' : 'r/' + this.search;
    },
    select(){
      console.log("select has changed to " + this.select)
      this.pushTargetSubRedditTitle(this.select)
    }
  },
  methods: {
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        console.log("v is " + v);
        this.items = this.subredditTitles.filter(itemArrayElement => {
          return (itemArrayElement || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },

    async pushTargetSubRedditTitle() {
      if (this.search == null) return;

      // format reddit post to have no whitespaces
      this.search = this.search.replace(/\s/g, "");
      this.search = this.search.replace("r/", "");

      // Show Loading Screen while fetching the posts
      this.disableSearch = true;
      await safeFetchSubRedditPosts(this.search);
      this.disableSearch = false;

      //todo console log remove
      printPostTitle();
    }
  },
}
</script>

<style scoped>

</style>