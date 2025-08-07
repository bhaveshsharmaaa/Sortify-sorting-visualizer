export const swapElements = (arr, i, j) => {
  if (i >= 0 && i < arr.length && j >= 0 && j < arr.length) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};

export const createSortedIndices = (count, startFrom = 0) => {
  const indices = [];
  for (let i = 0; i < count; i++) {
    indices.push(startFrom + i);
  }
  return indices;
};
