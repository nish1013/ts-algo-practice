// Calculate sum, mean, median, and mode for a given array

export function main(nums: number[]) {
  console.log("Using array:", nums);
  const s = sum(nums);
  const mn = mean(nums);
  const mdn = median(nums);
  const mdO2 = modeO2(nums); // O(n^2) version
  const mdON = modeON(nums); // O(n) version

  console.log(
    `Sum: ${s}, Mean: ${mn}, Median: ${mdn}, Mode (O(n^2)): ${mdO2}, Mode (O(n)): ${mdON}`,
  );
}

// Calculate the sum of the array
function sum(nums: number[]): number {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  return sum;
}

// Calculate the mean of the array
function mean(nums: number[]): number {
  return sum(nums) / nums.length;
}

// Calculate the median of the array
function median(nums: number[]): number {
  const sorted = selectionSort([...nums]); // Sort the array
  const length = sorted.length;

  if (length % 2 === 0) {
    // Even-length array: Average of two middle values
    return (sorted[length / 2 - 1] + sorted[length / 2]) / 2;
  } else {
    // Odd-length array: Middle value
    return sorted[Math.floor(length / 2)];
  }
}

// Calculate the mode of the array (O(n^2) version)
function modeO2(nums: number[]): number {
  const sorted = selectionSort([...nums]);
  let mode = sorted[0];
  let maxFrequency = 1;

  for (let i = 0; i < sorted.length; i++) {
    let currentFrequency = 1;
    for (let j = i + 1; j < sorted.length; j++) {
      if (sorted[i] === sorted[j]) {
        currentFrequency++;
      } else {
        break;
      }
    }
    if (currentFrequency > maxFrequency) {
      maxFrequency = currentFrequency;
      mode = sorted[i];
    }
  }

  return mode;
}

// Calculate the mode of the array (O(n) version)
function modeON(nums: number[]): number {
  const frequencyMap = new Map<number, number>();
  let mode = nums[0];
  let maxFrequency = 0;

  for (let num of nums) {
    const frequency = (frequencyMap.get(num) || 0) + 1;
    frequencyMap.set(num, frequency);

    if (frequency > maxFrequency) {
      maxFrequency = frequency;
      mode = num;
    }
  }

  return mode;
}

// Selection sort (in-place sorting)
function selectionSort(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j;
      }
    }
    [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
  }
  return nums;
}

// Bubble sort (for comparison)
function bubbleSort(nums: number[]): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }
  return nums;
}
