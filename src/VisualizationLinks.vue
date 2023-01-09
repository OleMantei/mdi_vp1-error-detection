<script>
// TODO: remove example
import {
  getFilteredExpensesActual,
  getFilteredExpensesPlanned,
  getFilteredTotalDifferenceExpensesActualExpensesPlanned,
  getFilteredPercentageDifferenceExpensesActualExpensesPlanned,
} from "./data/dataService";
import {
  sortDataItemsByTitle,
  sortDataItemsById,
  sortDataItemsByOutlier,
} from "./data/sortingRule";
console.log("FilteredExpensesActual", getFilteredExpensesActual());
console.log("FilteredExpensesPlanned", getFilteredExpensesPlanned());
console.log(
  "FilteredTotalDifferenceExpensesActualExpensesPlanned",
  getFilteredTotalDifferenceExpensesActualExpensesPlanned()
);
console.log(
  "FilteredPercentageDifferenceExpensesActualExpensesPlanned",
  getFilteredPercentageDifferenceExpensesActualExpensesPlanned()
);
console.log(
  "sortDataItemsByTitle",
  sortDataItemsByTitle(getFilteredExpensesPlanned())
);
console.log(
  "sortDataItemsById",
  sortDataItemsById(getFilteredExpensesPlanned())
);
console.log(
  "sortDataItemsByOutlier",
  sortDataItemsByOutlier(getFilteredExpensesPlanned())
);
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
