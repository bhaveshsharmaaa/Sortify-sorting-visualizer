import { createSortedIndices } from "./utils.js";

export const countingSort = (arr, setStats) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;
  if (n <= 1) return steps;

  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(n);

  let writes = 0;

  // Count occurrences
  for (let i = 0; i < n; i++) {
    count[array[i] - min]++;
    steps.push({
      array: [...array],
      comparing: [i],
      swapping: [],
      sorted: [],
    });
  }

  // Cumulative count
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // Build output array (stable sort)
  for (let i = n - 1; i >= 0; i--) {
    const val = array[i];
    const index = count[val - min] - 1;
    output[index] = val;
    count[val - min]--;
    writes++;

    // Visualization step: show output being built
    const visual = [...array];
    visual[index] = val; // mimic partial sorting for visual purposes

    steps.push({
      array: visual,
      comparing: [],
      swapping: [],
      sorted: [],
    });
  }

  // Copy back to array
  for (let i = 0; i < n; i++) {
    array[i] = output[i];
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: createSortedIndices(i, 0),
    });
  }

  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: createSortedIndices(n, 0),
  });

  setStats({
    comparisons: 0, // Counting sort does no comparisons
    swaps: 0, // No real swaps
    writes: writes, // Optional: count of value writes
    timeComplexity: "O(n + k)",
    spaceComplexity: "O(n + k)",
  });

  return steps;
};
