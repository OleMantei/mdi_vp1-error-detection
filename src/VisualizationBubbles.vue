<script>
import AppContainer from "./components/AppContainer.vue";
// TODO: import needed data as seen in VisualizationLinks Component
export default {
  name: "VisualizationBubbles",
  components: {
    AppContainer,
  },
};
</script>

<template>
  <AppContainer>
    <div class="bubbles-wrapper">
      <p class="text-h6 bg-grey h-100 text-center pa-2">
        🚧 Darstellungsvariante Blasen
      </p>
    </div>
  </AppContainer>
</template>

<style>
.bubbles-wrapper {
  height: 100%;
}
</style>
