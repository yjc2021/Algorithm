const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt']; 
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m] = input[0].split(' ').map(Number);
const edges = input.slice(1, m+1).map(line => line.split(' ').map(Number));
const graph = Array.from(Array(n+1), () => []);
const visited = Array(n+1).fill(0);

for(edge of edges) {
  const [u,v] = edge;
  graph[u].push(v);
  graph[v].push(u);
}

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

function bfs(v) {
  const q = new Queue();
  q.enqueue(v);
  visited[v] = 1;

  while(q.size()) {
    const cur = q.dequeue();
    for(let i = 0; i < graph[cur].length; i+=1) {
      const next = graph[cur][i];
      if(!visited[next]) {
        q.enqueue(next);
        visited[next] = visited[cur] + 1;
      }
    }
  }
}

bfs(1);
const max = Math.max(...visited);
let cnt = 0;
let barn = visited.findIndex(v => v===max);

for(let i = 1; i <= n; i+=1) {
  if(visited[i] === max) {
    cnt+=1;
  }
}

console.log(barn, max-1, cnt);
