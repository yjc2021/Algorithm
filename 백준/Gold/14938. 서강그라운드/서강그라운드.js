const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m,r] = input[0].split(' ').map(Number);
const items = [0, ...input[1].split(' ').map(Number)];
const edges = input.slice(2, 2+r).map(line => line.split(' ').map(Number));

const d = Array.from({length: n+1}, ()=>Array(n+1).fill(Infinity));
for(let i = 1; i <= n; i+=1) d[i][i] = 0;

for(const [u,v,cost] of edges) {
  d[u][v] = cost;
  d[v][u] = cost;
}

for(let k = 1; k <= n; k+=1) {
  for(let i = 1; i <= n; i+=1) {
    for(let j = 1; j <= n; j+=1) {
      if(d[i][j] > d[i][k] + d[k][j]) {
        d[i][j] = d[i][k] + d[k][j];
      }
    }
  }
}

let max = 0;
for(let i = 1; i <= n; i+=1) {
  let tmp = items[i];
  for(let j = 1; j <= n; j+=1) {
    if(d[i][j] === 0 || d[i][j] === Infinity) continue;
    if(d[i][j] > m) continue;
    tmp += items[j];
  }
  if(max < tmp) max = tmp;
}

console.log(max);