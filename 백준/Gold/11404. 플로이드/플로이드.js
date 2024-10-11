const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const n = Number(input[0]);
const m = Number(input[1]);
const edges = input.slice(2, 2+m).map(line => line.split(' ').map(Number));

const d = Array.from({length: n+1}, () => Array(n+1).fill(Infinity));

for(const [a,b,cost] of edges) {
  d[a][b] = Math.min(d[a][b], cost);
}
for(let i = 1; i <= n; i+=1) d[i][i] = 0;

for (let k = 1; k <= n; k+=1) {
  for(let i = 1; i <= n; i+=1) {
    for(let j = 1; j <= n; j+=1) {
      if(d[i][j] > d[i][k] + d[k][j]) {
        d[i][j] = d[i][k] + d[k][j];
      }
    }
  }
}

for(let i = 1; i <= n; i+=1) {
  const ans = [];
  for(let j = 1; j <= n; j+=1) {
    ans.push(d[i][j] === Infinity ? 0 : d[i][j]);
  }
  console.log(ans.join(' '))
};