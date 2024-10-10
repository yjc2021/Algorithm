const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');
const [n,m] = input[0].split(' ').map(Number);
const plants = input[1].split(' ').map(Number);
const edges = input.slice(2, 2+m).map(line => {
  const [u,v,w] = line.split(' ').map(Number);
  return [w,u,v];
});

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

let cnt = 0;
let ans = 0;

for(plant of plants) {
  isDifferentGroup(0, plant);
  cnt+=1;
}
edges.sort((a,b) => a[0] - b[0]);

for(const [w, u, v] of edges) {
  if(!isDifferentGroup(u,v)) continue;
  ans+=w;
  cnt+=1;
  if(cnt === n) break;
}
console.log(ans);