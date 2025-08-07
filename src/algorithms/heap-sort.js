import { swapElements, createSortedIndices } from './utils.js'

export const heapSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0

  const heapify = (n, i) => {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [largest, left],
        swapping: [],
        sorted: []
      })
      if (array[left] > array[largest]) {
        largest = left
      }
    }

    if (right < n) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [largest, right],
        swapping: [],
        sorted: []
      })
      if (array[right] > array[largest]) {
        largest = right
      }
    }

    if (largest !== i) {
      swaps++
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [i, largest],
        sorted: []
      })
      swapElements(array, i, largest)
      heapify(n, largest)
    }
  }

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    swaps++
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [0, i],
      sorted: createSortedIndices(n - i - 1, i + 1)
    })
    swapElements(array, 0, i)
    heapify(i, 0)
  }

  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: createSortedIndices(n, 0)
  })

  setStats({ comparisons, swaps, timeComplexity: "O(n log n)", spaceComplexity: "O(1)" })
  return steps
}
