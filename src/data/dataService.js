import ExpensesActual from "./2022-06-30 126001_Aufwendungen-Ist.json";
import ExpensesPlanned from "./2022-06-30 126001_Aufwendungen-Planung.json";
import ColorScale from "color-scales";

const nonDataItems = ["id", "title", "outlierScore", "outlierScoreColor"];
let outlierColorScale = new ColorScale(1, 100, [
  "#4caf50",
  "#ffeb3b",
  "#f44336",
]);

// TODO: Implement functionality which detects outlier
const alwaysMarkedAsOutlier = ["5241004", "5261000", "5262000"];
const outlierProbability = 0.15;
const addOutlierInformationToEachItem = (dataItems) => {
  let items = [];
  for (var i = 0; i < dataItems.length; i++) {
    let item = { ...dataItems[i] };
    if (
      alwaysMarkedAsOutlier.includes(dataItems[i].id) |
      (Math.random() < outlierProbability)
        ? true
        : false
    ) {
      item.outlierScore = Math.round(
        Math.floor(Math.random() * (100 / 3)) + 200 / 3
      );
    } else {
      item.outlierScore = Math.round(Math.floor(Math.random() * (200 / 3)));
    }
    item.outlierScoreColor = outlierColorScale
      .getColor(item.outlierScore)
      .toHexString();
    items.push(item);
  }
  return items;
};

// TODO: Delete when filtering is implemented
const sampleFilteredItems = [
  "5241004",
  "5251000",
  "5261000",
  "5262000",
  "5271000",
];
const getFilteredItems = (dataItems) => {
  let items = [];
  for (var i = 0; i < dataItems.length; i++) {
    if (sampleFilteredItems.includes(dataItems[i].id)) {
      items.push(dataItems[i]);
    }
  }
  return items;
};

export const getExpensesActual = () => {
  return addOutlierInformationToEachItem(ExpensesActual);
};

export const getExpensesPlanned = () => {
  return addOutlierInformationToEachItem(ExpensesPlanned);
};

// TODO: Filter data with FilterBar
export const getFilteredExpensesActual = () => {
  return getFilteredItems(getExpensesActual());
};

// TODO: Filter data with FilterBar
export const getFilteredExpensesPlanned = () => {
  return getFilteredItems(getExpensesPlanned());
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
    let id = filteredExpensesActual[i].id;

    nonDataItems.forEach((element) => {
      item[element] = filteredExpensesActual[i][element];
    });

    let filteredExpensesPlannedObject = filteredExpensesPlanned.filter(
      (obj) => {
        return obj.id === id;
      }
    );

    for (const [key, value] of Object.entries(filteredExpensesActual[i])) {
      if (!nonDataItems.includes(key)) {
        let filteredExpensesActualValue = value;
        let filteredExpensesPlannedValue =
          filteredExpensesPlannedObject[0][key];
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
        item[key] = calculatedDifference;
      }
    }
    filteredExpensesDifference.push(item);
  }
  return filteredExpensesDifference;
};