<template>
  <v-card
      color="grey lighten-5"
  >
    <v-sparkline v-if="graphData.showXLabel"
                 :value="graphData.yVal"
                 :gradient="gradient"
                 :smooth="radius || false"
                 :padding="padding"
                 :line-width="width"
                 :stroke-linecap="lineCap"
                 :gradient-direction="gradientDirection"
                 :fill="fill"
                 :type="type"
                 :auto-line-width="autoLineWidth"
                 :labels="graphData.xLabel"
                 auto-draw
    ></v-sparkline>
    <div v-else>
      <v-sparkline
          :value="graphData.yVal"
          type="bar"
          :gradient="gradient"
          :smooth="radius || false"
          :padding="padding"
          :line-width="width"
          :stroke-linecap="lineCap"
          :gradient-direction="gradientDirection"
          :fill="fill"
          :auto-line-width="autoLineWidth"
          :labels="graphData.xLabel"
          auto-draw
      >
<!--        <template>-->
<!--         {{ defaultXAxisLabel }}-->
<!--        </template>-->
      </v-sparkline>
<!--      <v-card-text>-->
<!--        <div class="text-h4 font-weight-thin">-->
<!--          Sales Last 24h-->
<!--        </div>-->
<!--      </v-card-text>-->

<!--      <v-row class="text-center">-->
<!--        {{ defaultXAxisLabel }}-->
<!--&lt;!&ndash;          <p class="text-center" flat color="grey lighten-0">&ndash;&gt;-->
<!--&lt;!&ndash;            {{ defaultXAxisLabel }}&ndash;&gt;-->
<!--&lt;!&ndash;          </p>&ndash;&gt;-->
<!--      </v-row>-->
    </div>
  </v-card>
</template>

<script>

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {

  name: "AnalyticsGraph",
  data: () => ({
    width: 4,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: gradients[5],

    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false,

    defaultXAxisLabel: "Distribution of Words In Titles"
  }),
  props: {
    graphData: Object,
  },
  methods: {}
}
</script>

<style scoped>

</style>