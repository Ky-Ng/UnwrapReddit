<template>
  <v-card color="deep-orange lighten-5"  class="rounded-1">
    <v-sparkline
        :value="topRedditAttribute.topDays.totalPercentage"
        :gradient="gradient"
        :smooth="radius || false"
        :padding="padding"
        :line-width="width"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        :fill="fill"
        :type="type"
        :auto-line-width="autoLineWidth"
        :labels="topRedditAttribute.topDays.totalPercentage"
        auto-draw

    >
    </v-sparkline>
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