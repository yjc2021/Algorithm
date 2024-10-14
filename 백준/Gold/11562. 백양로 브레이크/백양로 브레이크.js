const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m] = input[0].split(' ').map(Number);
const edges = input.slice(1, 1+m).map(line => line.split(' ').map(Number));
const k = Number(input[m+1]);
const queries = input.slice(m+2, m+2+k).map(line => line.split(' ').map(Number));

const d = Array.from({length: n+1}, () => Array(n+1).fill(Infinity));

for(let i = 1; i <= n; i+=1) d[i][i] = 0;
for(const [u,v,b] of edges) {
  d[u][v] = 0;
  d[v][u] = +!b;
}

for(let k = 1; k <= n; k+=1) {
  for(let i = 1; i <= n; i+=1) {
    for(let j = 1; j <= n; j+=1) {
      if(d[i][j] > d[i][k] + d[k][j]) d[i][j] = d[i][k] + d[k][j]
    }
  }
}

for(const [s,e] of queries) {
  console.log(d[s][e]);
}
