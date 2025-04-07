const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m] = input[0].split(' ').map(Number);
const arr = input.slice(1, 1+n).map(line => line.split('').map(Number));
const visited = Array.from({length:n}, () => Array(m).fill(0));

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
    return this.rear- this.front;
  }
}

const dir = [[0,1], [0,-1], [1,0], [-1,0]];

function outOfBounds(y,x) {
  return y < 0 || y >= n || x < 0 || x >= m;
}

function bfs(y,x) {
  const q = new Queue();
  visited[y][x] = 1;
  q.enqueue([y,x]);

  while(q.size()) {
    const [cy,cx] = q.dequeue();

    for([yy,xx] of dir) {
      const [ny,nx] = [cy+yy, cx+xx];
      
      if(outOfBounds(ny,nx)) continue;
      if(visited[ny][nx] || !arr[ny][nx]) continue;

      q.enqueue([ny,nx]);
      visited[ny][nx] = visited[cy][cx] + 1;
    }
  }

  return visited[n-1][m-1];
}

console.log(bfs(0,0));