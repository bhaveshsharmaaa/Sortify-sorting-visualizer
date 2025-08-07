import { swapElements, createSortedIndices } from './utils.js'

export const quickSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  let comparisons = 0, swaps = 0

  const partition = (low, high) => {
    const pivot = array[high]
    let i = low - 1

    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: [],
      pivot: [high]
    })

    for (let j = low; j < high; j++) {
      comparisons++
      steps.push({
        array: [...array],
        comparing: [j, high],
        swapping: [],
        sorted: [],
        pivot: [high]
      })

      if (array[j] < pivot) {
        i++
        if (i !== j) {
          swaps++
          steps.push({
            array: [...array],
            comparing: [],
            swapping: [i, j],
            sorted: [],
            pivot: [high]
          })
          swapElements(array, i, j)
        }
      }
    }

    swaps++
    steps.push({
      array: [...array],
      comparing: [],
      swapping: [i + 1, high],
      sorted: [],
      pivot: [high]
    })
    swapElements(array, i + 1, high)
    
    return i + 1
  }

  const quickSortHelper = (low, high) => {
    if (low < high) {
      const pi = partition(low, high)
      
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: [pi],
        pivot: []
      })

      quickSortHelper(low, pi - 1)
      quickSortHelper(pi + 1, high)
    }
  }

  quickSortHelper(0, array.length - 1)
  
  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: createSortedIndices(array.length, 0)
  })

  setStats({ comparisons, swaps, timeComplexity: "O(n log n)", spaceComplexity: "O(log n)" })
  return steps
}
