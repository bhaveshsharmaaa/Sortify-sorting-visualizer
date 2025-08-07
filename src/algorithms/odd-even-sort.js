import { swapElements, createSortedIndices } from './utils.js'

export const oddEvenSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0
  let sorted = false

  while (!sorted) {
    sorted = true

    // Odd phase
    for (let i = 1; i < n - 1; i += 2) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [i, i + 1],
        swapping: [],
        sorted: []
      })

      if (array[i] > array[i + 1]) {
        swaps++
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [i, i + 1],
          sorted: []
        })
        swapElements(array, i, i + 1)
        sorted = false
      }
    }

    // Even phase
    for (let i = 0; i < n - 1; i += 2) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [i, i + 1],
        swapping: [],
        sorted: []
      })

      if (array[i] > array[i + 1]) {
        swaps++
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [i, i + 1],
          sorted: []
        })
        swapElements(array, i, i + 1)
        sorted = false
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
