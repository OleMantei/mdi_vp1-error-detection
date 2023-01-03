<script>
// TODO: remove example
import {
  getFilteredExpensesActual,
  getFilteredExpensesPlanned,
  getFilteredTotalDifferenceExpensesActualExpensesPlanned,
  getFilteredPercentageDifferenceExpensesActualExpensesPlanned,
} from "./data/dataService";
console.log(getFilteredExpensesPlanned());
console.log(getFilteredExpensesActual());
console.log(getFilteredTotalDifferenceExpensesActualExpensesPlanned());
console.log(getFilteredPercentageDifferenceExpensesActualExpensesPlanned());
</script>

<template>
  <p class="font-weight-black">Darstellungsvarianten</p>
  <p>
    <router-link to="/xQcR3">Darstellungsvariante Balken</router-link>
  </p>
  <p>
    <router-link to="/c5sYf">Darstellungsvariante Blasen</router-link>
  </p>
</template>
