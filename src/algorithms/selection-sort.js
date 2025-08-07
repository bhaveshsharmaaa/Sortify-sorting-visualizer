import { swapElements, createSortedIndices } from './utils.js'

export const selectionSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    
    for (let j = i + 1; j < n; j++) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [minIdx, j],
        swapping: [],
        sorted: createSortedIndices(i, 0)
      })

      if (array[j] < array[minIdx]) {
        minIdx = j
      }
    }

    if (minIdx !== i) {
      swaps++
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [i, minIdx],
        sorted: createSortedIndices(i, 0)
      })
      
      swapElements(array, i, minIdx)
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
