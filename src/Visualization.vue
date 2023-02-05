<script>
import AppContainer from "./components/AppContainer.vue";
import { mapState } from "pinia";
import { useDataStore } from "./stores/DataStore";
export default {
  name: "VisualizationBars",
  components: {
    AppContainer,
  },
  computed: {
    ...mapState(useDataStore, ["filteredExpensesActual"]),
    ...mapState(useDataStore, ["filteredExpensesPlanned"]),
    ...mapState(useDataStore, [
      "filteredTotalDifferenceExpensesActualExpensesPlanned",
    ]),
    ...mapState(useDataStore, [
      "filteredPercentageDifferenceExpensesActualExpensesPlanned",
    ]),
  },
};
</script>

<template>
  <AppContainer>
    <div class="bars-wrapper">
      <p class="bg-grey h-100 text-center pa-2">
        {{ filteredExpensesActual }}
        <hr/>
        {{ filteredExpensesPlanned }}
        <hr/>
        {{ filteredTotalDifferenceExpensesActualExpensesPlanned }}
        <hr/>
        {{ filteredPercentageDifferenceExpensesActualExpensesPlanned }}
      </p>
    </div>
  </AppContainer>
</template>

<style>
.bars-wrapper {
  height: 100%;
}
</style>