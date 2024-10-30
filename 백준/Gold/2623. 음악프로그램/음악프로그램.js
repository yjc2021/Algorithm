class Queue {
  constructor() {
    this.q = [];
    this.h = 0;
    this.t = 0;
  }
  size() {
    return this.t - this.h;
  }
  push(item) {
    this.q[this.t++] = item;
  }
  pop() {
    const del = this.q[this.h];
    delete this.q[this.h++];
    return del;
  }
}

const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m] = input[0].split(' ').map(Number);
const adj = Array.from({length: n+1}, () => []);
const deg = Array(n+1).fill(0);
input.slice(1, 1+m).forEach(line => {
  const parsed = line.split(' ').slice(1).map(Number)
  for(let i=1; i<parsed.length;i+=1) {
    adj[parsed[i-1]].push(parsed[i]);
    deg[parsed[i]]+=1;
  }
})

const q = new Queue();
const res = [];
deg.slice(1).forEach((v,idx) => {
  if(v!==0) return;
  q.push(idx+1);
})

while(q.size()) {
  const cur = q.pop();
  res.push(cur);
  for(const next of adj[cur]) {
    deg[next] -= 1;
    if(deg[next] === 0) q.push(next);
  }
}

if(res.length !== n) {
  console.log(0);
  process.exit(0)
}

console.log(res.join('\n'))