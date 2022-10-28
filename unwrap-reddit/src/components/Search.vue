<template>
  <v-toolbar
      dark
      color="orange darken-3"
  >
    <v-autocomplete
        @keyup.enter="pushTargetSubRedditTitle"
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        cache-items
        class="mx-4"
        hide-no-data
        hide-details
        label="r/"
        :disabled=disableSearch
    ></v-autocomplete>
    {{ formatSearch }}
    <Loader v-bind:show="disableSearch"></Loader>
  </v-toolbar>
</template>

<script>
import {safeFetchSubRedditPosts, printPostTitle} from "@/parsers/parser";
import Loader from "@/components/user_input/Loader";

export default {
  name: "Search",
  components:{
    Loader,
  },
  data() {
    return {
      disableSearch: false,
      loading: false,
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

  },
  methods: {
    querySelections(v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.subredditTitles.filter(e => {
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        })
        this.loading = false
      }, 500)
    },
    async pushTargetSubRedditTitle() {
      if (this.search == null) return;

      // format reddit post to have no whitespaces
      this.search = this.search.replace(/\s/g, "");
      this.search = this.search.replace("r/", "");

      this.disableSearch = true;
      console.log("this.disableSearch = true;");
      await safeFetchSubRedditPosts(this.search);
      this.disableSearch = false;
      console.log("this.disableSearch = false;");
      printPostTitle();
    }
  },
}
</script>

<style scoped>

</style>