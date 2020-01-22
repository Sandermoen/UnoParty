export const deepCopyArray = array => {
  return [...JSON.parse(JSON.stringify(array))];
};
