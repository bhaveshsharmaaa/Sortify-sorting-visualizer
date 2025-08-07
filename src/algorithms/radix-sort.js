import { createSortedIndices } from "./utils.js";

export const radixSort = (arr, setStats) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;
  let comparisons = 0,
    swaps = 0;

  // Find the maximum number to know number of digits
  const max = Math.max(...array);

  // Do counting sort for every digit
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(array[i] / exp) % 10;
      count[digit]++;

      steps.push({
        array: [...array],
        comparing: [i],
        swapping: [],
        sorted: [],
        auxiliary: [i],
      });
    }

    // Change count[i] so that count[i] now contains actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(array[i] / exp) % 10;
      output[count[digit] - 1] = array[i];
      count[digit]--;
      swaps++;

      steps.push({
        array: [...array],
        comparing: [],
        swapping: [i, count[digit]],
        sorted: [],
        auxiliary: createSortedIndices(n - i, 0),
      });
    }

    // Copy the output array to array[], so that array[] now contains sorted numbers according to current digit
    for (let i = 0; i < n; i++) {
      array[i] = output[i];
    }

    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [],
      auxiliary: createSortedIndices(n, 0),
    });
  }

  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: createSortedIndices(n, 0),
  });

  setStats({
    comparisons,
    swaps,
    timeComplexity: "O(d×n)",
    spaceComplexity: "O(n+k)",
  });
  return steps;
};
