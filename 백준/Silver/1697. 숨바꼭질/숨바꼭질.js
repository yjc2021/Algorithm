const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

class Queue {
  constructor() {
    this.q = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(v) {
    this.q[this.rear++] = v;
  }
  dequeue() {
    const del = this.q[this.front];
    delete this.q[this.front++];
    return del;
  }
  size() {
    return this.rear - this.front;
  }
}

const [n,k] = input[0].split(' ').map(Number);
const limit = n > k ? n : k;
const visited = Array(limit*2).fill(0);
const q = new Queue();

visited[n] = 1;
q.enqueue(n);

const dir = [1,-1,2];
while(q.size()) {
  const c = q.dequeue();

  for(x of dir) {
    let n = x === 2 ? c*x : c+x;
    if(outOfBounds(n)) continue;
    if(visited[n]) continue;
    visited[n] = visited[c] + 1;
    q.enqueue(n);
  }
  
}

console.log(visited[k]-1);

function outOfBounds(pos) {
  return pos < 0 || pos >= limit*2;
}