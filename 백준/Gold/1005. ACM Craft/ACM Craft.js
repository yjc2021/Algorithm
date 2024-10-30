class Queue{
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

let t = Number(input[0]);

let ctr = 1;
while(t--) {
  const [n, k] = input[ctr].split(' ').map(Number);
  const cost = input[ctr+1].split(' ').map(Number);
  const deg = Array(n+1).fill(0);
  const adj = Array.from({length: n+1}, () => []);
  input.slice(ctr+2, ctr+2+k).forEach(line => {
    const [u,v] = line.split(' ').map(Number);
    adj[u].push(v);
    deg[v]+=1;
  })
  const w = Number(input[ctr+2+k]);
  console.log(solution(n,k,cost,deg,adj,w))
  ctr += (2+k+1);
}

function solution(n,k,cost,deg,adj,w) {
  const total = Array(n+1).fill(0);
  const q = new Queue();
  for(let i = 1; i <= n; i+=1) {
    if(deg[i] !== 0) continue;
    q.push(i);
  }

  while(q.size()) {
    const cur = q.pop();
    for(const next of adj[cur]) {
      total[next] = Math.max(total[next], total[cur] + cost[cur-1])
      deg[next] -= 1;
      if(deg[next] === 0) q.push(next);
    }
  }
  return total[w]+cost[w-1];
}