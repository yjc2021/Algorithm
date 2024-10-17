class PriorityQueue {
  constructor(comparator) {
    this.heap =[];
    this.compare = comparator || ((a,b) => b-a);
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
      const pIdx = Math.floor((index-1) / 2);
      const p = this.heap[pIdx];

      if(this.compare(p, cur) >= 0) break;

      this.heap[index] = p;
      this.heap[pIdx] = cur;
      index = pIdx;
    }
  }
  heapifyDown() {
    let index = 0;
    const cur = this.heap[index];
    const len = this.heap.length;

    while(true) {
      const lcIdx = index*2+1;
      const rcIdx = index*2+2;
      let lc, rc;
      let swap = null;

      if(lcIdx < len) {
        lc = this.heap[lcIdx];
        if(this.compare(lc, cur) > 0) {
          swap = lcIdx;
        }
      }
      if(rcIdx < len) {
        rc = this.heap[rcIdx];
        if(
          (swap !== null && this.compare(rc, lc) > 0) ||
          (swap === null && this.compare(rc, cur) > 0)
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

const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [v,e] = input[0].split(' ').map(Number);
const k = Number(input[1]);
const adj = Array.from({length: v+1}, () => []);
input.slice(2,2+e).forEach(line => {
  const [u,v,w] = line.split(' ').map(Number)
  adj[u].push([v,w]);
});

const d = Array(v+1).fill(Infinity);
const pq = new PriorityQueue((a,b) => b[0]-a[0]);

d[k] = 0;
pq.enqueue([0, k]);

while(pq.size()) {
  const [cost, cur] = pq.dequeue();
  if(cost !== d[cur]) continue;

  for(const [next, nCost] of adj[cur]) {
    if(d[next] <= d[cur] + nCost) continue;
    d[next] = d[cur] + nCost;
    pq.enqueue([d[next], next])
  }
}

for(let i = 1; i<=v; i+=1) {
  console.log(d[i] === Infinity ? 'INF' : d[i]);
}