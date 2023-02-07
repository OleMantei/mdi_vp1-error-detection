<script setup>
import { useDataStore } from "./stores/DataStore";
import Visualization from "./Visualization.vue";
useDataStore();
</script>

<template>
  <Visualization />
</template>
