import { createSortedIndices } from './utils.js'

export const insertionSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0

  for (let i = 1; i < n; i++) {
    let key = array[i]
    let j = i - 1

    while (j >= 0 && array[j] > key) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [],
        sorted: createSortedIndices(i, 0)
      })

      array[j + 1] = array[j]
      j--
      swaps++

      steps.push({
        array: [...array],
        comparing: [],
        swapping: j >= 0 ? [j + 1, j + 2] : [],
        sorted: createSortedIndices(i, 0)
      })
    }
    array[j + 1] = key
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
