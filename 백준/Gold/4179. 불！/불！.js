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

const [r,c] = input[0].split(' ').map(Number);
const arr = input.slice(1,1+r);
const visited = Array.from({length: r}, () => Array(c).fill(0));
const fVisited = Array.from({length: r}, () => Array(c).fill(0));
const q = new Queue();
const fQ = new Queue();
const dir = [[1,0], [-1,0], [0,1], [0,-1]];

arr.forEach((line, j) => {
  for(let i = 0; i < c; i+=1) {
    if(line[i] === 'J') {
      visited[j][i] = 1;
      q.enqueue([j,i]);
    } else if (line[i] === 'F') {
      fVisited[j][i] = 1;
      fQ.enqueue([j,i]);
    }
  }
})

while(fQ.size()) {
  const [cy, cx] = fQ.dequeue();
  for([yy,xx] of dir) {
    const [ny,nx] = [cy+yy, cx+xx];
    if(outOfBounds(ny,nx)) continue;
    if(fVisited[ny][nx]) continue;
    if(arr[ny][nx] === '#') continue;
    fVisited[ny][nx] = fVisited[cy][cx] + 1;
    fQ.enqueue([ny,nx]);
  }
}

let ans = 0;

while(q.size()) {
  const [cy, cx] = q.dequeue();
  if(cy === 0 || cx === 0 || cy === r-1 || cx === c-1) {
    ans = visited[cy][cx];
    break;
  }
  for([yy,xx] of dir) {
    const [ny,nx] = [cy+yy, cx+xx];
    if(outOfBounds(ny,nx)) continue;
    if(visited[ny][nx]) continue;
    if(arr[ny][nx] === '#') continue;
    if(fVisited[ny][nx] !== 0 && visited[cy][cx] + 1 >= fVisited[ny][nx]) continue;

    visited[ny][nx] = visited[cy][cx] + 1;
    q.enqueue([ny,nx]);
  }
}

console.log(ans === 0 ? 'IMPOSSIBLE' : ans);

function outOfBounds(y,x) {
  return y < 0 || y >=r || x < 0 || x >= c;
}