import { swapElements, createSortedIndices } from './utils.js'

export const gnomeSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0
  let index = 0

  while (index < n) {
    if (index === 0) {
      index++
    } else {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [index - 1, index],
        swapping: [],
        sorted: []
      })

      if (array[index] >= array[index - 1]) {
        index++
      } else {
        swaps++
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [index - 1, index],
          sorted: []
        })
        swapElements(array, index, index - 1)
        index--
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
