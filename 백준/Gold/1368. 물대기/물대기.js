const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

let n = Number(input[0]);
const w = input.slice(1, 1+n).map(Number);
const p = input.slice(1+n, 1+n+n).map(line => line.split(' ').map(Number));
const edges = [];
const parent = Array(n+5).fill(-1);

function find(a) {
  if (parent[a] < 0) return a;
  return parent[a] = find(parent[a]);
}
function isDifferentGroup(a,b) {
  a = find(a);
  b = find(b);

  if(a === b) return 0;
  if(parent[a] === parent[b]) parent[a] -= 1;
  if(parent[a] < parent[b]) {
    parent[b] = a
  } else {
    parent[a] = b;
  }
  return 1;
}

w.forEach((cost, i) => {
  edges.push([cost, i+1, n+1]);
})
p.forEach((costs, i) => {
  costs.forEach((cost, j) => {
    if(i >= j) return;
    edges.push([cost, i+1, j+1])
  })
})
n+=1;

edges.sort((a,b) => a[0] - b[0]);
let cnt = 0;
let ans = 0;

for(const [cost, a, b] of edges) {
  if(!isDifferentGroup(a,b)) continue;
  cnt+=1;
  ans += cost;
  if(cnt === n-1) break;
}
console.log(ans);