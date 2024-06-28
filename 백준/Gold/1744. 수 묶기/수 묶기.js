const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

class PriorityQueue {
  constructor(comparator) {
    this.heap = [];
    this.compare = comparator || ((a, b) => a - b);
  }
  size() {
    return this.heap.length;
  }
  enqueue(item) {
    this.heap.push(item);
    this.heapifyUp();
  }
  dequeue() {
    const priority = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length) {
      this.heap[0] = end;
      this.heapifyDown();
    }
    return priority;
  }
  heapifyUp() {
    let index = this.heap.length - 1;

    while (index > 0) {
      const cur = this.heap[index];
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (this.compare(parent, cur) >= 0) break;

      this.heap[parentIndex] = cur;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }
  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    const cur = this.heap[index];

    while (true) {
      const leftChildIndex = index * 2 + 1;
      const rightChildIndex = index * 2 + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (this.compare(leftChild, cur) > 0) {
          swap = leftChildIndex;
        }
      }
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && this.compare(rightChild, cur) > 0) ||
          (swap !== null && this.compare(rightChild, leftChild) > 0)
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;

      this.heap[index] = this.heap[swap];
      this.heap[swap] = cur;
      index = swap;
    }
  }
}

const n = +input[0];
const numbers = input.slice(1, 1 + n).map(Number);

console.log(solution(n, numbers));

function solution(n, numbers) {
  const minHeap = new PriorityQueue((a, b) => b - a);
  const maxHeap = new PriorityQueue();

  let hasZero = false;
  let sum = BigInt(0);
  for (const x of numbers) {
    if (x > 1) maxHeap.enqueue(BigInt(x));
    else if (x < 0) minHeap.enqueue(BigInt(x));
    else if (x === 1) {
      sum += BigInt(1);
    } else {
      hasZero = true;
    }
  }

  let plusLength = maxHeap.size();
  let minusLength = minHeap.size();

  for (let i = 0; i < Math.floor(plusLength / 2); i += 1) {
    sum += maxHeap.dequeue() * maxHeap.dequeue();
  }
  for (const x of maxHeap.heap) {
    sum += x;
  }
  for (let i = 0; i < Math.floor(minusLength / 2); i += 1) {
    sum += minHeap.dequeue() * minHeap.dequeue();
  }
  for (const x of minHeap.heap) {
    if (hasZero) {
      hasZero = false;
      continue;
    }
    sum += x;
  }
  return sum.toString();
}