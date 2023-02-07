<script>
import AppContainer from "./components/AppContainer.vue";
import ChartOutlier from "./charts/Outlier.vue";
import Years from "./charts/Years.vue";
export default {
  name: "VisualizationCharts",
  components: {
    AppContainer,
    ChartOutlier,
    Years,
  },
};
</script>

<template>
  <AppContainer>
    <div class="visualization-wrapper">
      <v-card class="visualization-card pa-5 mb-5" elevation="4">
        <p class="text-h5">Haushaltpositionen Ausreißerwahrscheinlichkeit</p>
        <div class="visualization-chart">
          <ChartOutlier />
        </div>
      </v-card>
      <v-card class="visualization-card pa-5" elevation="4">
        <p class="text-h5">Aufwendungen im Verlauf der Jahre</p>
        <div class="visualization-chart">
          <Years />
        </div>
      </v-card>
    </div>
  </AppContainer>
</template>

<style>
.visualization-wrapper {
  height: 100%;
}
.visualization-card {
  height: 42vh;
}
.visualization-chart {
  height: 100%;
  padding-bottom: 2rem;
}
</style>
