class Queue {
  constructor() {
    this.q = [];
    this.h = 0;
    this.t = 0;
  }
  push(item) {
    this.q[this.t++] = item;
  }
  pop() {
    const del = this.q[this.h];
    delete this.q[this.h++];
    return del;
  }
  size() {
    return this.t - this.h;
  }
}

const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [r,c] = input[0].split(' ').map(Number);
const arr = input.slice(1, 1+r).map(line => line.split(''));
const dir = [[-1,0], [1,0], [0,-1], [0,1]];
let sq = new Queue();
let sqTemp = new Queue();
let wq = new Queue();
let wqTemp = new Queue();
const wVisited = Array.from({length: r}, () => Array(c).fill(false));
const sVisited = Array.from({length:r}, () => Array(c).fill(false));
let s = [0,0];

for(let i = 0; i < r; i+=1) {
  for(let j = 0; j < c; j+=1) {
    if(arr[i][j] === '.' || arr[i][j] === 'L') {
      wVisited[i][j] = true;
      wq.push([i,j]);
    }
    if(arr[i][j] === 'L') {
      s = [i,j];
    }
  }
}
sq.push(s);
sVisited[s[0]][s[1]] = true;

let ans = 0;


while(true) {
  if(sBfs()) 
    break;
  wBfs();
  sq = sqTemp;
  wq = wqTemp;
  sqTemp = new Queue();
  wqTemp = new Queue();
  ans += 1;
}

console.log(ans);

function outOfBounds(y,x) {
  if(y < 0 || y >= r || x < 0 || x >= c) return true;
  return false;
}

function sBfs() {
  while(sq.size()) {
    const [y,x] = sq.pop();
    
    for([yy,xx] of dir) {
      const [ny,nx] = [y+yy, x+xx];
      if(outOfBounds(ny,nx)) continue;
      if(sVisited[ny][nx]) continue;

      sVisited[ny][nx] = true;
      if(arr[ny][nx] === '.') sq.push([ny,nx]);
      else if (arr[ny][nx] === 'X') sqTemp.push([ny,nx]);
      else if (arr[ny][nx] === 'L') return true;
    }
  }
  return false;
}
function wBfs() {
  while(wq.size()) {
    const [y,x] = wq.pop();

    for([yy,xx] of dir) {
      const [ny,nx] = [y+yy, x+xx];
      if(outOfBounds(ny,nx)) continue;
      if(wVisited[ny][nx]) continue;

      if (arr[ny][nx] === 'X') {
        wVisited[ny][nx] = true;
        wqTemp.push([ny, nx]);
        arr[ny][nx] = '.';
      }
    }
  }
}