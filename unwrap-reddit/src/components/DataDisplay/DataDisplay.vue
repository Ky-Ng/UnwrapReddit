<template>
  <div>
    <v-row class="mx-0">
      <v-col cols="6">
        <v-card color="indigo lighten-2" class="pa-1">
          <DataCard :subRedditAnalyticsCategory="subRedditAnalytics.weekday"></DataCard>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="indigo lighten-2" class="pa-1">
          <DataCard :subRedditAnalyticsCategory="subRedditAnalytics.hours"></DataCard>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mx-0">
      <v-col cols="6">
        <v-card color="indigo lighten-2" class="pa-1">
          <DataCard :subRedditAnalyticsCategory="subRedditAnalytics.weekday"></DataCard>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="indigo lighten-2" class="pa-1">
          <DataCard :subRedditAnalyticsCategory="subRedditAnalytics.hours"></DataCard>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DataCard from "@/components/DataDisplay/DataCard";

export default {
  name: "DataDisplay",
  components: {
    DataCard,
  },
  props: {
    subRedditAnalytics: Object,
  },
}
</script>

<style scoped>

</style>
<!--Dynamic Rendering version-->
<!--
<template>
  <div>
    <v-row class="mx-0" v-for="property in subRedditAnalytics" :key="property">
      <v-col cols="6">
        <v-card color="indigo lighten-2" class="pa-1">
          <DataCard :subRedditAnalyticsCategory="property"></DataCard>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="indigo lighten-2" class="pa-1">
          <DataCard :subRedditAnalyticsCategory="property"></DataCard>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DataCard from "@/components/DataDisplay/DataCard";

export default {
  name: "DataDisplay",
  components: {
    DataCard,
  },
  props: {
    subRedditAnalytics: Object,
  },
  data: () => ({
    analyticProperty: [
      this.subRedditAnalytics.weekday,
      this.subRedditAnalytics.hours,
      this.subRedditAnalytics.weekday,
      this.subRedditAnalytics.hours,
    ],
  }),
}
</script>

<style scoped>

</style>-->