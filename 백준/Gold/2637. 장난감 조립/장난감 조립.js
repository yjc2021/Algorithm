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

const n = Number(input[0]);
const m = Number(input[1]);
const adj = Array.from({length: n+1}, () => []);
const deg = Array(n+1).fill(0);
const cnt = Array(n+1).fill(0);
const isBase = Array(n+1).fill(true);
input.slice(2, 2+m).forEach(line => {
  const [u,v,k] = line.split(' ').map(Number);
  adj[u].push([v,k]);
  deg[v] += 1;
  isBase[u] = false;
})
const q = new Queue();
q.push(n);
cnt[n] = 1;

while(q.size()) {
  const cur = q.pop();
  for(const [next, nCnt] of adj[cur]) {
    deg[next] -= 1;
    cnt[next] += cnt[cur] * nCnt;
    if(deg[next] === 0) q.push(next);
  }
}

for(let i = 1; i<=n;i+=1) {
  if(isBase[i]) console.log(`${i} ${cnt[i]}`)
}


