import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const algorithms = {
  basic: [
    { id: "bubble", name: "Bubble Sort", complexity: "O(n²)", space: "O(1)" },
    {
      id: "insertion",
      name: "Insertion Sort",
      complexity: "O(n²)",
      space: "O(1)",
    },
    {
      id: "selection",
      name: "Selection Sort",
      complexity: "O(n²)",
      space: "O(1)",
    },
    { id: "gnome", name: "Gnome Sort", complexity: "O(n²)", space: "O(1)" },
  ],
  advanced: [
    {
      id: "merge",
      name: "Merge Sort",
      complexity: "O(n log n)",
      space: "O(n)",
    },
    {
      id: "quick",
      name: "Quick Sort",
      complexity: "O(n log n)",
      space: "O(log n)",
    },
    {
      id: "heap",
      name: "Heap Sort",
      complexity: "O(n log n)",
      space: "O(1)",
    },
    {
      id: "shell",
      name: "Shell Sort",
      complexity: "O(n^1.5)",
      space: "O(1)",
    },
  ],
  hybrid: [
    {
      id: "cocktail",
      name: "Cocktail Shaker Sort",
      complexity: "O(n²)",
      space: "O(1)",
    },
    {
      id: "oddeven",
      name: "Odd-Even Sort",
      complexity: "O(n²)",
      space: "O(1)",
    },
    { id: "comb", name: "Comb Sort", complexity: "O(n²)", space: "O(1)" },
    { id: "cycle", name: "Cycle Sort", complexity: "O(n²)", space: "O(1)" },
  ],
  noncomparison: [
    {
      id: "counting",
      name: "Counting Sort",
      complexity: "O(n+k)",
      space: "O(k)",
    },
    {
      id: "radix",
      name: "Radix Sort",
      complexity: "O(d×n)",
      space: "O(n+k)",
    },
    {
      id: "bucket",
      name: "Bucket Sort",
      complexity: "O(n+k)",
      space: "O(n)",
    },
    {
      id: "pigeonhole",
      name: "Pigeonhole Sort",
      complexity: "O(n+k)",
      space: "O(k)",
    },
  ],
};
