const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m] = input[0].split(' ').map(Number);
const arr = input.slice(1,n+1).map(line => line.split(' ').map(Number));

const visited = Array.from({length: n}, () => Array(m).fill(0));

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
const DIR = [[0,1], [0,-1], [1,0],[-1,0]]

function outOfBounds(y,x) {
  return y < 0 || y >= n || x < 0 || x >= m;
}

function dfs(y,x) {
  const stack = [];
  stack.push([y,x]);
  visited[y][x] = 1;

  let area = 1;

  while(stack.length) {
    const [cy,cx] = stack.pop();

    for([yy,xx] of DIR) {
      const [ny,nx] = [cy+yy, cx+xx];
      
      if(outOfBounds(ny,nx)) continue;
      if(visited[ny][nx]) continue;
      if(arr[ny][nx] === 0) continue;

      visited[ny][nx] = 1;
      stack.push([ny,nx]);

      if(arr[ny][nx] === 1) area += 1;
    }
  }

  return area;
}

let maxArea= 0;
let count = 0;

for(let i = 0; i < n; i+=1) {
  for(let j = 0; j < m; j+=1) {
    if(visited[i][j]) continue;
    if(arr[i][j] === 0) continue;
    
    count+=1;
    maxArea = Math.max(maxArea, dfs(i,j));
  }
}

console.log(count);
console.log(maxArea)