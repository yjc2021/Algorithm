const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

class Queue {
  constructor() {
    this.q = [];
    this.rear = 0;
    this.front = 0;
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

const [n,m] = input[0].split(' ').map(Number);
const edges = input.slice(1,m+1).map(line => line.split(' ').map(Number));
const graph = Array.from(Array(n+1), () => Array(n+1).fill(0));

for(edge of edges) {
  const [u,v] = edge;
  graph[u][v] = 1;
  graph[v][u] = 1;
}

function bfs(v) {
  const visited = Array(n+1).fill(0);
  const q = new Queue();
  q.enqueue(v);
  visited[v] = 1;

  while(q.size()) {
    const cur = q.dequeue();
    for(let i = 1; i <= n; i+=1) {
      if(graph[cur][i] && !visited[i]) {
        q.enqueue(i);
        visited[i] = visited[cur] + 1;
      }
    }
  }

  return visited.reduce((acc,cur) => acc+cur-1, 0);
}

let min = Infinity;
let ans = 0;
for(let i = 1; i <= n; i+=1) {
  const x = bfs(i)
  if(x < min) {
    min = x;
    ans = i;
  }
}

console.log(ans);