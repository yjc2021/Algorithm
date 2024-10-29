class PriorityQueue {
  constructor(comparator) {
    this.heap = [];
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
    let index = this.heap.length-1;
    while(index) {
      const pIdx = Math.floor((index-1)/2);
      const p = this.heap[pIdx];
      const cur = this.heap[index];

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
          (swap !== null && this.compare(rc, lc) > 0) ||
          (swap === null && this.compare(rc, cur) > 0)
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

const [n,m,k] = input[0].split(' ').map(Number);
const adj = Array.from({length: n+1}, () => []);
input.slice(1,1+m).forEach(line => {
  const [u,v,cost] =  line.split(' ').map(Number);

  adj[u].push([cost, 0, v]);
  adj[v].push([cost, 0, u]);
  adj[u].push([0,1,v]);
  adj[v].push([0,1,u]);
});

const pq = new PriorityQueue((a,b) => b[0] - a[0]);
const d = Array.from({length: k+1}, () => Array(n+1).fill(Infinity));

for(let i = 0; i <= k; i+=1) {
  d[i][1] = 0;
}
pq.enqueue([0, 0, 1]);

while(pq.size()) {
  const [cDist, ck, cur] = pq.dequeue();
  if(d[ck][cur] !== cDist) continue;
  for([nDist, nk, next] of adj[cur]) {
    nDist += cDist;
    nk += ck;
    if(nk > k) continue;
    if(nDist >= d[nk][next]) continue;
    d[nk][next] = nDist;
    pq.enqueue([d[nk][next], nk, next]);
  }
}

let ans = Infinity;
for(let i = 1; i<=k; i+=1) {
  ans = Math.min(ans, d[i][n])
}
console.log(ans);