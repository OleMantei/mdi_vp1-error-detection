export const sortDataItemsByTitle = (dataItems) => {
  return dataItems.sort((a, b) => a.title.localeCompare(b.title));
};

export const sortDataItemsById = (dataItems) => {
  return dataItems.sort((a, b) => a.id.localeCompare(b.id));
};

export const sortDataItemsByOutlier = (dataItems) => {
  return dataItems.sort(function (a, b) {
    return b.outlierScore - a.outlierScore;
  });
};
