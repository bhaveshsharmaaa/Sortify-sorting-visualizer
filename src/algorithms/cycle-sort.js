import { createSortedIndices } from './utils.js'

export const cycleSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = array[cycleStart]
    let pos = cycleStart

    // Find position where we put the item
    for (let i = cycleStart + 1; i < n; i++) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [cycleStart, i],
        swapping: [],
        sorted: []
      })

      if (array[i] < item) {
        pos++
      }
    }

    // If item is already in correct position
    if (pos === cycleStart) {
      // Skip to next cycle start instead of continue
    } else {
      // Skip duplicates
      while (item === array[pos]) {
        pos++
      }

      // Put the item to its correct position
      if (pos !== cycleStart) {
        swaps++
        steps.push({
          array: [...array],
          comparing: [],
          swapping: [cycleStart, pos],
          sorted: []
        })

        const temp = item
        item = array[pos]
        array[pos] = temp
      }

      // Rotate rest of the cycle
      while (pos !== cycleStart) {
        pos = cycleStart

        // Find position where we put the element
        for (let i = cycleStart + 1; i < n; i++) {
          comparisons++
          steps.push({
            array: [...array],
            comparing: [pos, i],
            swapping: [],
            sorted: []
          })

          if (array[i] < item) {
            pos++
          }
        }

        // Skip duplicates
        while (item === array[pos]) {
          pos++
        }

        // Put the item to its correct position
        if (item !== array[pos]) {
          swaps++
          steps.push({
            array: [...array],
            comparing: [],
            swapping: [cycleStart, pos],
            sorted: []
          })

          const temp = item
          item = array[pos]
          array[pos] = temp
        }
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
