const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m] = input[0].split(' ').map(Number);
const edges = [];
input.slice(1, 1+m).forEach(line => {
  const [a,b,cost] = line.split(' ').map(Number)
  edges.push([cost, a, b]);
})

const p = Array(n+1).fill(-1);
function find(x) {
  if(p[x] < 0) return x;
  return p[x] = find(p[x]);
}
function isDifferentGroup(a,b){
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

edges.sort((a,b) => a[0] - b[0]);
let cnt = 0;
let ans = [];
let max = 0;
for([cost, a, b] of edges) {
  if(!isDifferentGroup(a,b)) continue;
  ans.push(cost);
  if(max < cost) max = cost;
  cnt+=1;
  if(cnt === n-1) break;
}
console.log(ans.reduce((acc, cur) => acc + cur, 0) - max);