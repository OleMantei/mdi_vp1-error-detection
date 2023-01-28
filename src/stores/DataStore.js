import { defineStore } from "pinia";
import {
  getExpensesActual,
  getExpensesPlanned,
  getFilteredTotalDifferenceExpensesActualExpensesPlanned,
  getFilteredPercentageDifferenceExpensesActualExpensesPlanned,
} from "../data/dataService";

export const useDataStore = defineStore("DataStore", {
  state: () => {
    return {
      expensesActual: getExpensesActual(),
      expensesPlanned: getExpensesPlanned(),
      totalDifferenceExpensesActualExpensesPlanned:
        getFilteredTotalDifferenceExpensesActualExpensesPlanned(),
      percentageDifferenceExpensesActualExpensesPlanned:
        getFilteredPercentageDifferenceExpensesActualExpensesPlanned(),
      filteredExpensesActual: [],
      filteredExpensesPlanned: [],
      filteredTotalDifferenceExpensesActualExpensesPlanned: [],
      filteredPercentageDifferenceExpensesActualExpensesPlanned: [],
      checkedDataItems: [],
    };
  },
});
