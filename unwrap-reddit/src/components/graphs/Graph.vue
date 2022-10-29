<template>
  <v-card
      color="grey lighten-5"
  >
    <v-sparkline
        :value="xAxis.frequency"
        :gradient="gradient"
        :smooth="radius || false"
        :padding="padding"
        :line-width="width"
        :stroke-linecap="lineCap"
        :gradient-direction="gradientDirection"
        :fill="fill"
        :type="type"
        :auto-line-width="autoLineWidth"
        :labels="xAxis.days"
        auto-draw

    >
      <template v-slot:label="item">
        {{ item.value }}
      </template>
    </v-sparkline>
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

  name: "Graph",
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

    // Data Propagation
  }),
  props:{
    xAxis: Object,
  }

}
</script>

<style scoped>

</style>