import { createSortedIndices } from './utils.js'

export const shellSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = array[i]
      let j = i

      while (j >= gap) {
        comparisons++
        steps.push({
          array: [...array],
          comparing: [j - gap, j],
          swapping: [],
          sorted: []
        })

        if (array[j - gap] > temp) {
          swaps++
          steps.push({
            array: [...array],
            comparing: [],
            swapping: [j - gap, j],
            sorted: []
          })
          array[j] = array[j - gap]
          j -= gap
        } else {
          break
        }
      }
      array[j] = temp
    }
  }

  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: createSortedIndices(n, 0)
  })

  setStats({ comparisons, swaps, timeComplexity: "O(n^1.5)", spaceComplexity: "O(1)" })
  return steps
}
