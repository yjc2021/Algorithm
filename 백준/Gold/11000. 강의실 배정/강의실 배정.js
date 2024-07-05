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
    if (this.heap.length > 0) {
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

      this.heap[index] = parent;
      this.heap[parentIndex] = cur;
      index = parentIndex;
    }
  }
  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    const cur = this.heap[0];

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
          (swap != null && this.compare(rightChild, leftChild) > 0)
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
const classes = input
  .slice(1, 1 + n)
  .map((line) => line.split(" ").map(Number));

console.log(solution(n, classes));

function solution(n, classes) {
  classes.sort((a, b) => a[0] - b[0]);
  const heap = new PriorityQueue((a, b) => b - a);

  heap.enqueue(classes[0][1]);
  for (let i = 1; i < n; i += 1) {
    if (heap.heap[0] <= classes[i][0]) {
      heap.dequeue();
    }
    heap.enqueue(classes[i][1]);
  }

  return heap.size();
}
