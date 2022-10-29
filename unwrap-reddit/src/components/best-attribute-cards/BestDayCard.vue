<template>
  <v-card color="deep-orange lighten-5"  class="rounded-1">
    <v-card-title>{{ topRedditAttribute.topDays.title }}: {{ topRedditAttribute.topDays["1"].stringDay }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="9">
          See Also: {{ topRedditAttribute.topDays["2"].stringDay }}, {{ topRedditAttribute.topDays["3"].stringDay }}
        </v-col>
        <v-col cols="3">
          <i>
          <small>{{ Math.floor(topRedditAttribute.topDays.totalPercentage * 100) }}% of all posts</small>
          </i>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  name: "BestDayCard",
  data: () => ({
    title: 'Best Time',
    bestValue: '5pm',
    runnerUps: '2pm, 3pm, 9pm',
    percentage: 3,
    // topRedditAttribute: Analytics.getTopThreeDays(),
  }),
  props:{
    topRedditAttribute: Object,
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