import { swapElements, createSortedIndices } from './utils.js'

export const combSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0
  let gap = n
  const shrink = 1.3
  let sorted = false

  while (!sorted) {
    gap = Math.floor(gap / shrink)
    if (gap <= 1) {
      gap = 1
      sorted = true
    }

    for (let i = 0; i + gap < n; i++) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [i, i + gap],
        swapping: [],
        sorted: []
      })

      if (array[i] > array[i + gap]) {
        swaps++
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [i, i + gap],
          sorted: []
        })
        swapElements(array, i, i + gap)
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
