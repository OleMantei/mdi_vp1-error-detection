<script>
import FilterBar from "./FilterBar.vue";
export default {
  name: "AppContainer",
  components: {
    FilterBar,
  },
};
</script>

<template>
  <div class="d-flex flex-column justify-start" style="min-height: 100vh">
    <div>
      <v-layout>
        <v-app-bar color="blue">
          <v-app-bar-title>👷‍♂️ App-Leiste</v-app-bar-title>
        </v-app-bar>
        <v-main></v-main>
      </v-layout>
    </div>
    <div class="d-flex flex-grow-1">
      <div>
        <FilterBar />
      </div>
      <div class="flex-grow-1 pa-5">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
