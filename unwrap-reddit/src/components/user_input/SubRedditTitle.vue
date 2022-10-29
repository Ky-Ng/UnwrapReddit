<template>
  <v-row class="ml-0 mr-2 mt-2">
    <v-col>
      <div class="indigo darken-1 text-center rounded">
        <v-row>
          <v-col cols=""></v-col>
          <v-col>
            <v-card-title class="white--text ">Analytics from subreddit:_<strong>r/{{ subRedditName }}</strong></v-card-title>
          </v-col>
          <v-col cols=""></v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SubRedditTitle",
  props: {
    subRedditName: String,
  }
}
</script>

<style scoped>

</style>