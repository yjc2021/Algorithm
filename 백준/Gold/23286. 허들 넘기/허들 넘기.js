const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m,t] = input[0].split(' ').map(Number);
const edges = input.slice(1,1+m).map(line => line.split(' ').map(Number));
const practice = input.slice(1+m, 1+m+t).map(line=>line.split(' ').map(Number));

const d = Array.from({length: n+1}, ()=>Array(n+1).fill(Infinity));
for(let i = 1; i<=n;i+=1)d[i][i] = 0;
for(const [u,v,h]of edges) {
  d[u][v] = h;
}

for(let k=1; k<=n; k+=1) {
  for(let i=1; i<=n; i+=1) {
    for(let j=1; j<=n; j+=1) {
      d[i][j] = Math.min(d[i][j], Math.max(d[i][k], d[k][j]))
    }
  }
}

for(const [s,e] of practice) {
  console.log(d[s][e]===0 || d[s][e] === Infinity ? -1 : d[s][e]);
}