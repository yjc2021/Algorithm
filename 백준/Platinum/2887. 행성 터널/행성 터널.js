const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const n = Number(input[0]);
const coords = input.slice(1, 1+n).map(line=>line.split(' ').map(Number));
const edges = [];
const p = Array(n+1).fill(-1);

function find(x) {
  if(p[x] < 0) return x;
  return p[x] = find(p[x]);
}
function isDifferentGroup(a,b) {
  a = find(a);
  b = find(b);
  if(a===b) return 0;
  if(p[a] < p[b]) {
    p[a] += p[b];
    p[b] = a;
  } else {
    p[b] += p[a];
    p[a] = b;
  }
  return 1;
}

const x = [];
const y = [];
const z = [];

coords.forEach(([xx,yy,zz], idx) => {
  x.push([xx, idx]);
  y.push([yy, idx]);
  z.push([zz, idx]);
})
x.sort((a,b) => a[0] - b[0]);
y.sort((a,b) => a[0] - b[0]);
z.sort((a,b) => a[0] - b[0]);

for(let i = 1; i < n; i+=1) {
  edges.push([Math.abs(x[i-1][0] - x[i][0]), x[i-1][1], x[i][1]]);
  edges.push([Math.abs(y[i-1][0] - y[i][0]), y[i-1][1], y[i][1]]);
  edges.push([Math.abs(z[i-1][0] - z[i][0]), z[i-1][1], z[i][1]]);
}

edges.sort((a,b) => a[0] - b[0]);

let ans = 0;
let cnt = 0;

for(const [cost, a, b] of edges) {
  if(!isDifferentGroup(a,b)) continue;
  ans += cost;
  cnt += 1;
  if(cnt === n-1) break;
}

console.log(ans);