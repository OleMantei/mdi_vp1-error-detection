<script setup>
import VisualizationBars from "./VisualizationBars.vue";
import { useDataStore } from "./stores/DataStore";
useDataStore();
</script>

<template>
  <VisualizationBars />
</template>
