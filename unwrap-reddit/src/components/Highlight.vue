<template>
  <v-card color="deep-orange lighten-5">
    <v-card-title>{{title}}:
    </v-card-title>
    <v-text>
      {{value}}
    </v-text>
  </v-card>
</template>

<script>
export default {
  name: "Highlight",
  data: () => ({
    title: 'Best Time',
    value: '5pm',
  }),
}
</script>

<style scoped>

</style>