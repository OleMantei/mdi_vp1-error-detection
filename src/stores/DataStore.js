import { defineStore } from "pinia";
import {
  getExpensesActual,
  getExpensesPlanned,
  getTotalDifferenceExpensesActualExpensesPlanned,
  getPercentageDifferenceExpensesActualExpensesPlanned,
} from "../data/dataService";

export const useDataStore = defineStore("DataStore", {
  state: () => {
    return {
      expensesActual: getExpensesActual(),
      expensesPlanned: getExpensesPlanned(),
      totalDifferenceExpensesActualExpensesPlanned:
        getTotalDifferenceExpensesActualExpensesPlanned(),
      percentageDifferenceExpensesActualExpensesPlanned:
        getPercentageDifferenceExpensesActualExpensesPlanned(),
      filteredExpensesActual: [],
      filteredExpensesPlanned: [],
      filteredTotalDifferenceExpensesActualExpensesPlanned: [],
      filteredPercentageDifferenceExpensesActualExpensesPlanned: [],
      checkedDataItems: [],
    };
  },
});
