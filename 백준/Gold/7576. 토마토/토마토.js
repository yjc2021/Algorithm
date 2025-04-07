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

const [m,n] = input[0].split(' ').map(Number);
const tomatoes = input.slice(1, n+1).map(line=>line.split(' ').map(Number));
const visited = Array.from({length: n}, () => Array(m).fill(0));
const dir = [[1,0], [-1,0], [0,1], [0,-1]];
const q = new Queue();

for(let i = 0; i < n; i+=1) {
  for(let j = 0; j < m; j+=1) {
    if(tomatoes[i][j] === 1) {
      q.enqueue([i,j]);
      visited[i][j] = 1;
    }
  }
}

if(q.size() === m*n) {
  console.log(0);
  return;
}

bfs();

let ans = 0;
for(let i = 0; i < n; i+=1) {
  for(let j = 0; j < m; j+=1) {
    if(tomatoes[i][j] === 0) {
      console.log(-1);
      return;
    }
    ans = Math.max(visited[i][j], ans);
  }
}
console.log(ans-1);

function bfs() {
  while(q.size()) {
    const [cy,cx] = q.dequeue();
    for(let [yy,xx] of dir) {
      const [ny, nx] = [cy+yy, cx+xx];
      if(outOfBounds(ny,nx)) continue;
      if(visited[ny][nx] || tomatoes[ny][nx] === 1 || tomatoes[ny][nx] === -1) continue;

      q.enqueue([ny,nx]);
      tomatoes[ny][nx] = 1;
      visited[ny][nx] = visited[cy][cx] + 1;
    }
  }
}

for(let i = 0; i < n; i+=1) {
  for(let j = 0; j < m; j+=1) {
    if(!tomatoes[i][j] || visited[i][j]) continue;
    bfs(i,j);
  }
}

function outOfBounds(y,x) {
  return y < 0 || y >= n || x < 0 || x >= m;
}