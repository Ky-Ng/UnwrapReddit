<template>
  <v-toolbar
      dark
      color="teal"
  >
<!--    <v-toolbar-title>State selection</v-toolbar-title>-->
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
<!--    <v-btn icon>-->
<!--      <v-icon @click="pushTargetSubRedditTitle">mdi-magnify</v-icon>-->
<!--    </v-btn>-->
  </v-toolbar>
</template>

<script>
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
      console.log("submitted the subreddit form");
    }
  },
}
</script>

<style scoped>

</style>