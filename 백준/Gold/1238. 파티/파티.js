class PriorityQueue {
  constructor(comparator) {
    this.heap = [];
    this.compare = comparator || ((a,b) => b-a)
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
    let index = this.heap.length-1;

    while(index) {
      const pIdx = Math.floor((index-1)/2);
      const p = this.heap[pIdx];
      const cur= this.heap[index];
      if(this.compare(p, cur) >= 0) break;
      this.heap[index] = p;
      this.heap[pIdx] = cur;
      index = pIdx;
    }
  }
  heapifyDown() {
    let index = 0;
    const len = this.heap.length;
    const cur = this.heap[index];

    while(true) {
      let swap = null;
      let lc, rc;
      const lcIdx = index*2+1;
      const rcIdx = index*2+2;

      if(lcIdx < len) {
        lc = this.heap[lcIdx];
        if(this.compare(lc, cur) > 0) swap = lcIdx;
      }
      if(rcIdx < len) {
        rc = this.heap[rcIdx];
        if(
          (swap === null && this.compare(rc, cur) > 0) ||
          (swap !== null && this.compare(rc, lc) > 0)
        ) swap = rcIdx;
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

const [n,m,x] = input[0].split(' ').map(Number);
const adj = Array.from({length:n+1}, () => []);
input.slice(1, 1+m).forEach(line => {
  const [u,v,t] = line.split(' ').map(Number);
  adj[u].push([v,t]);
})

function solution(s, e) {
  const d = Array(n+1).fill(Infinity);
  const pq = new PriorityQueue((a,b) => b[0] - a[0]);
  d[s] = 0;
  pq.enqueue([0,s]);

  while(pq.size()) {
    const [cost, cur] = pq.dequeue();
    if(d[cur] !== cost) continue;
    for(const [next, nCost] of adj[cur]) {
      if(d[next] <= d[cur] + nCost) continue;
      d[next] = d[cur] + nCost;
      pq.enqueue([d[next], next]);
    }
  }

  return d[e];
}

let ans = 0;
for(let i = 1; i <= n; i+=1) {
  ans = Math.max(ans, solution(i,x) + solution(x,i));
}
console.log(ans);