import { swapElements, createSortedIndices } from './utils.js'

export const cocktailSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0
  let start = 0, end = n - 1
  let swapped = true

  while (swapped) {
    swapped = false

    for (let i = start; i < end; i++) {
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
        swapped = true
      }
    }

    if (!swapped) break
    end--
    swapped = false

    for (let i = end - 1; i >= start; i--) {
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
        swapped = true
      }
    }
    start++
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
