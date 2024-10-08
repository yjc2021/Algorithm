const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const n = Number(input[0]);
const edges = [];
input.slice(1,n+1).forEach((line, i) => {
  line.split(' ').map(Number).forEach((cost, j) => {
    if(i >= j) return;
    edges.push([cost, i+1, j+1]);
  })
})

const parent = Array(n+1).fill(-1);
function find(x) {
  if(parent[x] < 0) return x;
  return parent[x] = find(parent[x]);
}
function isDifferentGroup(a,b) {
  a = find(a);
  b = find(b);
  if(a===b) return 0;
  if(parent[a] < parent[b]) {
    parent[a] += parent[b];
    parent[b] = a;
  } else {
    parent[b] += parent[a];
    parent[a] = b;
  }
  return 1;
}

let cnt = 0;
let ans = 0;
edges.sort((a,b) => a[0] - b[0]);
for(const [cost, a, b] of edges) {
  if(!isDifferentGroup(a,b)) continue;
  cnt += 1;
  ans += cost;
  if(cnt === n-1) break;
}

console.log(ans);