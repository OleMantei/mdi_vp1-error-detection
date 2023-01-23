export const searchDataItems = (dataItems, searchTerm) => {
  let matchingItems = [];
  dataItems.forEach((item) => {
    if (item.id.includes(searchTerm) | item.title.includes(searchTerm)) {
      matchingItems.push(item);
    }
  });
  return matchingItems;
};
