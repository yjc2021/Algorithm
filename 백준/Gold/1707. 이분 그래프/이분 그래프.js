const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt']
const input = require('fs').readFileSync(...path).toString().trim().split("\n")

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

const k = Number(input[0]);
let cnt = 1;
for(let i = 0; i < k; i+=1) {
  const [v,e] = input[cnt++].split(' ').map(Number);
  const edges = input.slice(cnt, cnt+e).map(line => line.split(' ').map(Number));
  cnt += e;
  solution(v,e,edges);
}

function solution(v,e,edges) {
  const graph = Array.from(Array(v+1), () => []);
  const visited = Array(v+1).fill(0);
  for(edge of edges) {
    const [u,v] = edge;
    graph[u].push(v);
    graph[v].push(u);
  }

  function bfs(v) {
    let check = 1;
    const q = new Queue();
    q.enqueue(v);
    visited[v] = check;

    while(q.size()) {
      const cur = q.dequeue();

      if(visited[cur] === 1) check = 2;
      else check = 1;

      for(let i = 0; i < graph[cur].length; i+=1) {
        const next = graph[cur][i];
        if(!visited[next]) {
          visited[next] = check;
          q.enqueue(next);
        } else if (visited[cur] === visited[next]) {
          return;
        }
      }
    }
  }

  for(let i = 1; i <= v; i+=1) {
    if(!visited[i]) bfs(i);
  }

  function isAns() {
    for(let i = 1; i <= v; i+=1) {
      for(let j = 0; j < graph[i].length; j+=1) {
        const next = graph[i][j];
        if(visited[i] === visited[next]) {
          console.log('NO');
          return;
        }
      }
    }
    console.log('YES');
  }
  isAns();
}