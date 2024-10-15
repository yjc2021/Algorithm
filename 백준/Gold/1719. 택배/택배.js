const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m] = input[0].split(' ').map(Number);
const edges = input.slice(1, 1+m).map(line => line.split(' ').map(Number));
const d = Array.from({length: n+1}, () => Array(n+1).fill(Infinity));
const nxt = Array.from({length: n+1}, () => Array(n+1).fill(0));
for(let i = 1; i <= n; i+=1) d[i][i] = 0;
for(const [a,b,cost] of edges) {
  d[a][b] = Math.min(d[a][b], cost);
  d[b][a] = Math.min(d[b][a], cost);
  nxt[a][b] = b;
  nxt[b][a] = a;
}

for(let k = 1; k<=n; k+=1) {
  for(let i = 1; i<=n; i+=1) {
    for(let j = 1; j<=n; j+=1) {
      if(d[i][j] > d[i][k] + d[k][j]) {
        d[i][j] = d[i][k] + d[k][j];
        nxt[i][j] = nxt[i][k];
      }
    }
  }
}

for(line of nxt.slice(1)) {
  const tmp = line.slice(1).reduce((acc,cur)=>{
    const c = cur === 0 ? '-' : cur;
    return acc + ' ' + c;
  }, '')
  console.log(tmp);
}