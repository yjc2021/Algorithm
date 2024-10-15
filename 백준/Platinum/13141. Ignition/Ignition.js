const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m] = input[0].split(' ').map(Number);
const edges = input.slice(1, 1+m).map(line=>line.split(' ').map(Number));
const d = Array.from({length:n+1}, () => Array(n+1).fill(Infinity));
for(let i=1;i<=n;i+=1) d[i][i] = 0;
for(const [u,v,cost] of edges) {
  d[u][v] = Math.min(cost, d[u][v]);
  d[v][u] = Math.min(cost, d[v][u]);
}

for(let k=1;k<=n;k+=1) {
  for(let i=1;i<=n;i+=1) {
    for(let j=1;j<=n;j+=1)  {
      if(d[i][j] > d[i][k] + d[k][j]) {
        d[i][j] = d[i][k] + d[k][j];
      }
    }
  }
}
let ans = Infinity;
for(let i = 1; i<=n; i+=1) {
  let tmp = 0;
  for(const [u,v,cost] of edges){
    tmp = Math.max(tmp, (d[i][u] + d[i][v] + cost) / 2);
  }
  ans = Math.min(ans, tmp);
}

console.log(ans.toFixed(1))