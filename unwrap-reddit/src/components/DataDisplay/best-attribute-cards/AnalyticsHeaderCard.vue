<template>
  <v-card color="deep-orange lighten-5"  class="rounded-1">
    <v-card-title>{{ cardData.title }}: <strong>{{ cardData["1"].string }}</strong>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="9">
          See Also: <strong>{{ cardData["2"].string }}</strong>, <strong>{{ cardData["3"].string }}</strong>
        </v-col>
        <v-col cols="3">
          <i>
          <small><strong>{{ Math.floor(cardData.totalPercentage * 100) }}%</strong> of all posts</small>
          </i>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: "AnalyticsHeaderCard",
  data: () => ({
    title: 'Best Time',
    bestValue: '5pm',
    runnerUps: '2pm, 3pm, 9pm',
    percentage: 3,
    // topRedditAttribute: Analytics.getTopThreeDays(),
  }),
  props:{
    cardData: Object,
  },
  methods: {
    getSubRedditData(){
      // this.topRedditAttribute = Analytics.getTopThreeDays();
    }
  },

}
</script>

<style scoped>

</style>