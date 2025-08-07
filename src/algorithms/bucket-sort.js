import { createSortedIndices } from "./utils.js";

export const bucketSort = (arr, setStats) => {
  const steps = [];
  const array = [...arr];
  const n = array.length;
  let comparisons = 0,
    swaps = 0;

  if (n <= 0) {
    return steps;
  }

  // Find minimum and maximum values
  const min = Math.min(...array);
  const max = Math.max(...array);
  const bucketCount = Math.floor(Math.sqrt(n));
  const bucketSize = Math.ceil((max - min + 1) / bucketCount);

  // Create empty buckets
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Put array elements in different buckets
  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.min(
      Math.floor((array[i] - min) / bucketSize),
      bucketCount - 1
    );
    buckets[bucketIndex].push(array[i]);

    steps.push({
      array: [...array],
      comparing: [i],
      swapping: [],
      sorted: [],
      auxiliary: [i],
    });
  }

  // Sort individual buckets and concatenate
  let index = 0;
  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i].length > 0) {
      // Simple insertion sort for each bucket
      const bucket = buckets[i];
      for (let j = 1; j < bucket.length; j++) {
        const key = bucket[j];
        let k = j - 1;

        while (k >= 0 && bucket[k] > key) {
          comparisons++;
          bucket[k + 1] = bucket[k];
          k--;
          swaps++;
        }
        bucket[k + 1] = key;
      }

      // Copy sorted bucket back to main array
      for (let j = 0; j < bucket.length; j++) {
        array[index] = bucket[j];

        steps.push({
          array: [...array],
          comparing: [],
          swapping: [index],
          sorted: createSortedIndices(index, 0),
          auxiliary: [index],
        });

        index++;
        swaps++;
      }
    }
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
    timeComplexity: "O(n+k)",
    spaceComplexity: "O(n)",
  });
  return steps;
};
