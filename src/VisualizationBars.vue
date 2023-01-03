<script>
import AppContainer from "./components/AppContainer.vue";
// TODO: import needed data as seen in VisualizationLinks Component
export default {
  name: "VisualizationBars",
  components: {
    AppContainer,
  },
};
</script>

<template>
  <AppContainer>
    <div class="bars-wrapper">
      <p class="text-h6 bg-grey h-100 text-center pa-2">
        🚧 Darstellungsvariante Balken
      </p>
    </div>
  </AppContainer>
</template>

<style>
.bars-wrapper {
  height: 100%;
}
</style>
