<template>
  <v-card color="deep-orange lighten-5">
    <v-card-title>{{ title }}: {{ bestValue }}
    </v-card-title>
    <v-card-text>
      See Also: {{ runnerUps }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Highlight",
  data: () => ({
    title: 'Best Time',
    bestValue: '5pm',
    runnerUps: '2pm, 3pm, 9pm',
  }),
}
</script>

<style scoped>

</style>