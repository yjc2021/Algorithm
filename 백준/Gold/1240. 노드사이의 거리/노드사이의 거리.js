const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

class Queue {
  constructor() {
    this.q = [];
    this.h = 0;
    this.t = 0;
  }
  enqueue(v) {
    this.q[this.t++] = v;
  }
  dequeue() {
    const del = this.q[this.h];
    delete this.q[this.h++];
    return del;
  }
  size() {
    return this.t - this.h;
  }
}

const [n,m] = input[0].split(' ').map(Number);
const edges = input.slice(1, n).map(line => line.split(' ').map(Number));
const queries = input.slice(n, n+m).map(line => line.split(' ').map(Number));

const graph = Array.from(Array(n+1), () => []);
for(const [from, to, dist] of edges) {
  graph[from].push([dist, to]);
  graph[to].push([dist, from]);
}

function bfs(from, to) {
  const visited = Array(n+1).fill(0);
  const q = new Queue();
  visited[from] = 1;
  q.enqueue(from);

  while(q.size()) {
    const cur = q.dequeue();
    if(cur === to) {
      return visited[to] - 1;
    }
    for(const [dist, next] of graph[cur]) {
      if(!visited[next]) {
        visited[next] = visited[cur] + dist;
        q.enqueue(next);
      }
    }
  }
}

queries.forEach(([from, to]) => console.log(bfs(from, to)));
