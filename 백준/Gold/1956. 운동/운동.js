const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [v,e] = input[0].split(' ').map(Number);
const edges = input.slice(1, 1+e).map(line => line.split(' ').map(Number));
const d = Array.from({length: v+1}, () => Array(v+1).fill(Infinity));
for(let i = 1; i<=v; i+=1)d[i][i] = 0;
for(const [a,b,cost] of edges) {
  d[a][b] = Math.min(d[a][b], cost);
}

for(let k = 1; k<=v; k+=1) {
  for(let i = 1; i <= v; i+=1) {
    for(let j = 1; j<=v; j+=1) {
      if(d[i][j] > d[i][k] + d[k][j]) d[i][j] = d[i][k] + d[k][j];
    }
  }
}

let ans = Infinity;
for(let i = 1; i<=v; i+=1) {
  for(let j = i + 1; j <= v; j+=1) {
    ans = Math.min(ans, d[i][j] + d[j][i]);
  }
}
console.log(ans === Infinity ? -1 : ans);