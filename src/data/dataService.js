import ExpensesActual from "./2022-06-30 126001_Aufwendungen-Ist.json";
import ExpensesPlanned from "./2022-06-30 126001_Aufwendungen-Planung.json";

// TODO: Delete when filtering is implemented
const sampleFilteredItems = [
  "5241004 So. Bewirtschaftungsk. der Grst.",
  "5251000 Haltung von Fahrzeugen",
  "5261000 Dienst- u.Schutzkleidung",
  "5262000 Aus- und Fortbildung, Umschulung",
  "5271000 Beson. Vwaltungs-u Betriebsaufw.",
];

export const getExpensesActual = () => {
  return ExpensesActual;
};

export const getExpensesPlanned = () => {
  return ExpensesPlanned;
};

// TODO: Filter data with FilterBar
export const getFilteredExpensesActual = () => {
  let items = [];
  for (var i = 0; i < ExpensesActual.length; i++) {
    if (sampleFilteredItems.includes(ExpensesActual[i].title)) {
      items.push(ExpensesActual[i]);
    }
  }
  return items;
};

// TODO: Filter data with FilterBar
export const getFilteredExpensesPlanned = () => {
  let items = [];
  for (var i = 0; i < ExpensesPlanned.length; i++) {
    if (sampleFilteredItems.includes(ExpensesPlanned[i].title)) {
      items.push(ExpensesPlanned[i]);
    }
  }
  return items;
};

export const getFilteredTotalDifferenceExpensesActualExpensesPlanned = () => {
  return getFilteredDifferenceExpensesActualExpensesPlanned("total");
};

export const getFilteredPercentageDifferenceExpensesActualExpensesPlanned =
  () => {
    return getFilteredDifferenceExpensesActualExpensesPlanned("percentage");
  };

const getFilteredDifferenceExpensesActualExpensesPlanned = (type) => {
  let filteredExpensesActual = getFilteredExpensesActual();
  let filteredExpensesPlanned = getFilteredExpensesPlanned();
  let filteredExpensesDifference = [];
  for (var i = 0; i < filteredExpensesActual.length; i++) {
    let item = {};
    let title = filteredExpensesActual[i].title;
    item.title = title;
    let filteredExpensesPlannedObject = filteredExpensesPlanned.filter(
      (obj) => {
        return obj.title === title;
      }
    );

    for (const [key, value] of Object.entries(filteredExpensesActual[i])) {
      let filteredExpensesActualValue = value;
      let filteredExpensesPlannedValue = filteredExpensesPlannedObject[0][key];
      let calculatedDifference;
      switch (type) {
        case "total":
          calculatedDifference =
            filteredExpensesActualValue - filteredExpensesPlannedValue;
          break;
        case "percentage":
          calculatedDifference =
            ((filteredExpensesActualValue - filteredExpensesPlannedValue) /
              filteredExpensesPlannedValue) *
            100.0;
          break;
        default:
          calculatedDifference = null;
          break;
      }

      if (key !== "title") {
        item[key] = calculatedDifference;
      }
    }
    filteredExpensesDifference.push(item);
  }
  return filteredExpensesDifference;
};
