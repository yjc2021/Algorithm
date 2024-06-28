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

const [n, m] = input[0].split(" ").map(Number);
const cards = input[1].split(" ").map(Number);

console.log(solution(n, m, cards));

function solution(n, m, cards) {
  const heap = new PriorityQueue((a, b) => b - a);
  for (const card of cards) {
    heap.enqueue(card);
  }

  for (let i = 0; i < m; i += 1) {
    const card1 = heap.dequeue();
    const card2 = heap.dequeue();
    heap.enqueue(card1 + card2);
    heap.enqueue(card1 + card2);
  }

  return heap.heap.reduce((acc, cur) => BigInt(acc) + BigInt(cur)).toString();
}