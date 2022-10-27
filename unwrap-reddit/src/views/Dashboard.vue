<template>
  <v-main>
    <v-row>
      <v-col>
        <!--        <redditSearch></redditSearch>-->
      </v-col>
      <v-btn @click="fetchPosts">
        Fetch Reddit Posts
      </v-btn>
      <v-btn @click="printPostsToConsole">
        Print Posts To Console
      </v-btn>
    </v-row>

  </v-main>
</template>

<script>
import {fetchSubRedditPosts, redditPosts} from "@/parsers/parser";

export default {
  name: "Dashboard",
  components: {
    // redditSearch: Search,
  },
  data: () => ({}),
  methods: {
    fetchPosts() {
      fetchSubRedditPosts();
    },
    printPostsToConsole(){
      console.log(redditPosts.length);
      redditPosts.forEach(
          redditpost => console.log(redditpost)
      );
    }
  }
}
</script>

<style scoped>

</style>