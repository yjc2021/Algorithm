const dest = process.execArgv.includes("--stack-size=65536")
  ? "/dev/stdin"
  : "input.txt";

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }
  push(node) {
    this.heap.push(node);
    let i = this.heap.length - 1;
    let parentI = Math.floor((i - 1) / 2);
    while (i > 0 && this.heap[parentI] > this.heap[i]) {
      this.swap(i, parentI);
      i = parentI;
      parentI = Math.floor((i - 1) / 2);
    }
  }
  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const result = this.heap[0];
    this.heap[0] = this.heap.pop();
    let i = 0;
    while (true) {
      const leftI = i * 2 + 1;
      const rightI = i * 2 + 2;
      if (leftI >= this.heap.size) break;
      let nextI = i;
      if (this.heap[nextI] > this.heap[leftI]) {
        nextI = leftI;
      }
      if (rightI < this.heap.length && this.heap[nextI] > this.heap[rightI]) {
        nextI = rightI;
      }
      if (nextI === i) break;
      this.swap(i, nextI);
      i = nextI;
    }
    return result;
  }

  swap(a, b) {
    const temp = this.heap[a];
    this.heap[a] = this.heap[b];
    this.heap[b] = temp;
  }
}

const input = require("fs").readFileSync(dest, "utf-8").split("\n");

const [n, m] = input.shift().split(" ").map(Number);

const edges = input.map((line) => line.split(" ").map(Number));

const graph = Array.from(Array(n + 1), () => []);
const inDegrees = Array(n + 1).fill(0);

for (const [a, b] of edges) {
  graph[a].push(b);
  inDegrees[b] += 1;
}

function topologySort() {
  const result = [];
  const q = new MinHeap();

  for (let i = 1; i <= n; i += 1) {
    if (inDegrees[i] === 0) q.push(i);
  }
  while (q.size()) {
    const now = q.pop();
    result.push(now);
    for (i of graph[now]) {
      inDegrees[i] -= 1;
      if (inDegrees[i] === 0) q.push(i);
    }
  }
  return result;
}

const result = topologySort();
console.log(result.join(" "));
