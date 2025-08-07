import { createSortedIndices } from './utils.js'

export const pigeonholeSort = (arr, setStats) => {
  const steps = []
  const array = [...arr]
  const n = array.length
  let comparisons = 0, swaps = 0

  if (n === 0) {
    return steps
  }

  // Find minimum and maximum values
  const min = Math.min(...array)
  const max = Math.max(...array)
  const range = max - min + 1

  // Create pigeonhole array
  const pigeonholes = Array.from({ length: range }, () => [])

  // Put every element in its pigeonhole
  for (let i = 0; i < n; i++) {
    const pigeonholeIndex = array[i] - min
    pigeonholes[pigeonholeIndex].push(array[i])

    steps.push({
      array: [...array],
      comparing: [i],
      swapping: [],
      sorted: [],
      auxiliary: [i]
    })
  }

  // Put the elements back into array in order
  let index = 0
  for (let i = 0; i < range; i++) {
    while (pigeonholes[i].length > 0) {
      array[index] = pigeonholes[i].shift()
      
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [index],
        sorted: createSortedIndices(index, 0),
        auxiliary: [index]
      })
      
      index++
      swaps++
    }
  }

  steps.push({
    array: [...array],
    comparing: [],
    swapping: [],
    sorted: createSortedIndices(n, 0)
  })

  setStats({ comparisons, swaps, timeComplexity: "O(n+k)", spaceComplexity: "O(k)" })
  return steps
}
