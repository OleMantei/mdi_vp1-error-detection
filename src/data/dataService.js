import ExpensesActual from "./2022-06-30 126001_Aufwendungen-Ist.json";
import ExpensesPlanned from "./2022-06-30 126001_Aufwendungen-Planung.json";
import ColorScale from "color-scales";

export const nonDataItems = [
  "id",
  "title",
  "outlierScore",
  "outlierScoreColor",
  "checked",
];
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

export const getExpensesActual = () => {
  return addOutlierInformationToEachItem(ExpensesActual);
};

export const getExpensesPlanned = () => {
  return addOutlierInformationToEachItem(ExpensesPlanned);
};

export const getTotalDifferenceExpensesActualExpensesPlanned = () => {
  return getDifferenceExpensesActualExpensesPlanned("total");
};

export const getPercentageDifferenceExpensesActualExpensesPlanned = () => {
  return getDifferenceExpensesActualExpensesPlanned("percentage");
};

const getDifferenceExpensesActualExpensesPlanned = (type) => {
  let expensesActual = getExpensesActual();
  let expensesPlanned = getExpensesPlanned();
  let expensesDifference = [];
  for (var i = 0; i < expensesActual.length; i++) {
    let item = {};
    let id = expensesActual[i].id;

    nonDataItems.forEach((element) => {
      item[element] = expensesActual[i][element];
    });

    let expensesPlannedObject = expensesPlanned.filter((obj) => {
      return obj.id === id;
    });

    if (expensesPlannedObject[0] !== undefined) {
      for (const [key, value] of Object.entries(expensesActual[i])) {
        if (!nonDataItems.includes(key)) {
          let expensesActualValue = value;

          let expensesPlannedValue = expensesPlannedObject[0][key];
          let calculatedDifference;
          switch (type) {
            case "total":
              calculatedDifference = expensesActualValue - expensesPlannedValue;
              break;
            case "percentage":
              calculatedDifference =
                ((expensesActualValue - expensesPlannedValue) /
                  expensesPlannedValue) *
                100.0;
              break;
            default:
              calculatedDifference = null;
              break;
          }
          item[key] = calculatedDifference;
        }
      }
    }

    expensesDifference.push(item);
  }
  return expensesDifference;
};
