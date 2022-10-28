<template>
  <v-toolbar
      dark
      color="teal"
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
    ></v-autocomplete>
    {{formatSearch}}
  </v-toolbar>
</template>

<script>
import {safeFetchSubRedditPosts} from "@/parsers/parser";

export default {
  name: "Search",
  data() {
    return {
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
    pushTargetSubRedditTitle(){

      // safeFetchSubRedditPosts('some invalid subreddit name')
      safeFetchSubRedditPosts('dogs')
    }
  },
}
</script>

<style scoped>

</style>