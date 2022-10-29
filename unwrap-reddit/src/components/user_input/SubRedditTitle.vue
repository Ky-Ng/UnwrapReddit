<template>
  <v-row class="mx-0">
    <v-col>
      <div class="indigo darken-1 text-center rounded">
        <v-card-title class="white--text ">Analytics from subreddit:_<strong>r/{{ subRedditName }}</strong></v-card-title>
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