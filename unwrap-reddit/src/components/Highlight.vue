<template>
  <v-card color="deep-orange lighten-5">
    <v-card-title>{{ title }}: {{ bestValue }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="9">
          See Also: {{ topRedditAttribute["1"].stringDay }}
        </v-col>
        <v-col cols="3">
          <i>
          <small>{{ topRedditAttribute.percentage }}% of all posts</small>
          </i>
        </v-col>
      </v-row>
    </v-card-text>

  </v-card>
</template>

<script>
// import {Analytics} from "@/parsers/analytics";

export default {
  name: "Highlight",
  beforeMount() {
    this.topRedditAttribute = {
      percentage: 5, 1: {stringDay: "today"}
    }
  },
  // updated() {
  //   this.topRedditAttribute = Analytics.getTopThreeDays();
  // },
  data: () => ({
    title: 'Best Time',
    bestValue: '5pm',
    runnerUps: '2pm, 3pm, 9pm',
    percentage: 3,
    topRedditAttribute: null,
    // topRedditAttribute: Analytics.getTopThreeDays(),
  }),
  methods: {
    getSubRedditData(){
      // this.topRedditAttribute = Analytics.getTopThreeDays();
    }
  },

}
</script>

<style scoped>

</style>