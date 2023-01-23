export const searchDataItems = (dataItems, searchTerm) => {
  let matchingItems = [];
  dataItems.forEach((item) => {
    if (
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) |
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      matchingItems.push(item);
    }
  });
  return matchingItems;
};
