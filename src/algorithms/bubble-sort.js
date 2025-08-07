import { swapElements, createSortedIndices } from './utils.js'

export const bubbleSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: createSortedIndices(i, n - i)
      })

      if (array[j] > array[j + 1]) {
        swaps++
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [j, j + 1],
          sorted: createSortedIndices(i, n - i)
        })
        
        swapElements(array, j, j + 1)
      }
    }
  }

  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: createSortedIndices(n, 0)
  })

  setStats({ comparisons, swaps, timeComplexity: "O(n²)", spaceComplexity: "O(1)" })
  return steps
}
