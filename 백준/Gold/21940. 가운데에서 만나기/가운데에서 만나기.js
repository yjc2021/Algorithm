const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m] = input[0].split(' ').map(Number);
const edges = input.slice(1, 1+m).map(line => line.split(' ').map(Number));
const k = Number(input[m+1]);
const c = [0, ...input[m+2].split(' ').map(Number)];

const d = Array.from({length: n+1}, () => Array(n+1).fill(Infinity));
for(let i = 1; i<=n; i+=1) d[i][i] = 0;
for(const [u,v,cost] of edges) {
  d[u][v] = cost;
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

const dist = Array(n+1).fill(0);
for(let x = 1; x <= n; x+=1) {
  let max = 0;
  for(const p of c) {
    if(d[p][x] === Infinity || d[p][x] === 0 || d[x][p] === Infinity || d[x][p] === 0) continue;
    if(d[p][x] + d[x][p] > max) {
      max = d[p][x] + d[x][p];
    }
  }
  dist[x] = [max, x];
}
dist.sort((a,b) => a[0]-b[0]);
const min = dist[1][0];
let ans = [];
dist.slice(1).forEach((d, i) => {
  if(d[0] === min) ans.push(d[1])
});
console.log(ans.join(' '));

