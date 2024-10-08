class PriorityQueue {
  constructor(comparator) {
    this.heap = [];
    this.compare = comparator || ((a,b) => a-b)
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
    if(this.heap.length) {
      this.heap[0] = end;
      this.heapifyDown();
    }
    return priority;
  }
  heapifyUp() {
    let index = this.heap.length - 1;

    while(index) {
      const cur = this.heap[index];
      const pIdx = Math.floor((index-1)/2);
      const p = this.heap[pIdx];

      if(this.compare(p, cur) >= 0) break;

      this.heap[index] = p;
      this.heap[pIdx] = cur;
      index = pIdx;
    }
  }
  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    const cur = this.heap[index];

    while(true) {
      let swap = null;
      const lcIdx = index*2+1;
      const rcIdx = index*2+2;
      let lc, rc;

      if(lcIdx < length) {
        lc = this.heap[lcIdx];
        if(this.compare(lc, cur) > 0) swap = lcIdx;
      }
      if(rcIdx < length) {
        rc = this.heap[rcIdx];
        if(
          (swap === null && this.compare(rc, cur) > 0) ||
          (swap !== null && this.compare(rc, lc) > 0)
        ) {
          swap = rcIdx;
        }
      }
      if(swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = cur;
      index = swap;
    }
  }
}

const UP = 0, DOWN = 1;
const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
let worst = 0, best = 0;
let cnt = 0;
const adj = Array.from({length: n+1}, () => []);
input.slice(1, 1+(m+1)).forEach(line => {
  const [a,b,c] = line.split(' ').map(Number);
  if(a === 0 && b === 1) {
    if(c === UP) {
      worst+=1;
      best+=1;
    }
    return;
  }
  adj[a].push([b, c]);
  adj[b].push([a,c]);
})
const check = Array(n+1).fill(0);

let pq = new PriorityQueue((a,b) => b[0]-a[0]);
check[1] = 1;
for(const [next, type] of adj[1]) {
  pq.enqueue([type, 1, next]);
}

// worst path
while(cnt < n-1) {
  if(pq.size === 0) break;
  const [type, a, b] = pq.dequeue();
  if(check[b]) continue;
  check[b] = 1;
  cnt+=1;
  if(type === UP) worst+=1;
  for(const [next, c] of adj[b]) {
    if(check[next]) continue;
    pq.enqueue([c, b, next]);
  } 
}
for(let i = 0; i < check.length; i+=1) {
  check[i] = 0;
}
pq = new PriorityQueue((a,b) => a[0] - b[0]);
check[1] = 1;
for(const [next, type] of adj[1]) {
  pq.enqueue([type, 1, next]);
}
// best path
cnt=0;
while(cnt < n-1) {
  if(pq.size() === 0) break;
  const [type, a, b] = pq.dequeue();
  if(check[b]) continue;
  check[b] = 1;
  cnt+=1;
  if(type === UP) best+=1;
  for(const [next, c] of adj[b]) {
    if(check[next]) continue;
    pq.enqueue([c, b, next]);
  } 
}

console.log(worst**2 - best**2);