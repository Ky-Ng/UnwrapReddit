<template>
  <v-card color="indigo lighten-2" class="pa-1">
    <AnalyticsHeaderCard :card-data="subRedditAnalyticsCategory.cardData"/>
    <AnalyticsGraph :graphData="subRedditAnalyticsCategory.graphData"/>
  </v-card>
</template>

<script>
import AnalyticsGraph from "@/components/DataDisplay/graphs/AnalyticsGraph";
import AnalyticsHeaderCard from "@/components/DataDisplay/best-attribute-cards/AnalyticsHeaderCard";

export default {
  name: "DataCard",
  props: {
    subRedditAnalyticsCategory: Object,
  },
  components:{
    AnalyticsHeaderCard,
    AnalyticsGraph,
  }
}
</script>

<style scoped>

</style>