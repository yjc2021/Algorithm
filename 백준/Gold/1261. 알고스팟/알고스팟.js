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

const [m,n] = input[0].split(' ').map(Number);
const arr = input.slice(1, 1+n).map(line => line.split('').map(Number));

const dir = [[0,1], [0,-1], [1, 0], [-1,0]];

const d = Array.from({length: n+1}, () => Array(m+1).fill(Infinity));
const pq = new PriorityQueue((a,b) => b[0] - a[0]);

d[1][1] = 0;
pq.enqueue([0,1,1]);

while(pq.size()) {
  const [cw,cy,cx] = pq.dequeue();
  if(cw !== d[cy][cx]) continue;

  for(const [yy, xx] of dir) {
    const [ny,nx] = [cy+yy, cx+xx];
    if(ny < 1 || nx < 1 || ny > n || nx > m) continue;
    if(d[ny][nx] <= d[cy][cx] + arr[ny-1][nx-1]) continue;
    d[ny][nx] = d[cy][cx] + arr[ny-1][nx-1];
    pq.enqueue([d[ny][nx],ny,nx])
  }
}
console.log(d[n][m]);