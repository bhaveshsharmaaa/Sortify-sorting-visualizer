import { createSortedIndices } from './utils.js'

export const mergeSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  let comparisons = 0, swaps = 0

  const merge = (left, mid, right) => {
    const leftArr = []
    const rightArr = []
    
    for (let i = left; i <= mid; i++) {
      leftArr.push(array[i])
    }
    for (let i = mid + 1; i <= right; i++) {
      rightArr.push(array[i])
    }
    
    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: [],
        auxiliary: createSortedIndices(right - left + 1, left)
      })

      if (leftArr[i] <= rightArr[j]) {
        array[k] = leftArr[i]
        i++
      } else {
        array[k] = rightArr[j]
        j++
      }
      swaps++
      k++
    }

    while (i < leftArr.length) {
      array[k] = leftArr[i]
      i++
      k++
      swaps++
    }

    while (j < rightArr.length) {
      array[k] = rightArr[j]
      j++
      k++
      swaps++
    }

    steps.push({
      array: [...array],
      comparing: [],
      swapping: createSortedIndices(right - left + 1, left),
      sorted: []
    })
  }

  const mergeSortHelper = (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      mergeSortHelper(left, mid)
      mergeSortHelper(mid + 1, right)
      merge(left, mid, right)
    }
  }

  mergeSortHelper(0, array.length - 1)
  
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: createSortedIndices(array.length, 0)
  })

  setStats({ comparisons, swaps, timeComplexity: "O(n log n)", spaceComplexity: "O(n)" })
  return steps
}
