import { defineStore } from "pinia";
import {
  getExpensesActual,
  getExpensesPlanned,
} from "../data/dataService";

export const useDataStore = defineStore("DataStore", {
  state: () => {
    return {
      expensesActual: getExpensesActual(),
      expensesPlanned: getExpensesPlanned(),
      filteredExpensesActual: [],
      filteredExpensesPlanned: [],
      filteredTotalDifferenceExpensesActualExpensesPlanned: [],
      filteredPercentageDifferenceExpensesActualExpensesPlanned: [],
      checkedDataItems: [],
    };
  },
});
