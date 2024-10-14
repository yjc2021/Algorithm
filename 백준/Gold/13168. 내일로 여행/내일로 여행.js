const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n, r] = input[0].split(' ').map(Number);
const cities = new Map();
input[1].split(' ').forEach((v,i) => {
  if(cities.has(v)) return;
  cities.set(v, i);
});
const m = Number(input[2]);
const nodes = input[3].split(' ');
const k = Number(input[4]);
const edges = input.slice(5, 5+k).map(line => 
  line.split(' ').map((v,i) => i === 3 ? Number(v) : v));

const d = Array.from({length: n}, () => Array(n).fill(Infinity));
const nd = Array.from({length: n}, () => Array(n).fill(Infinity));

function discountCost(type, cost) {
  if(type === 'Mugunghwa' || type === 'ITX-Saemaeul' || type === 'ITX-Cheongchun') return 0;
  if (type === 'S-Train' || type === 'V-Train') return cost/2;
  return cost;
}
for(let i = 0; i < n; i+=1) {d[i][i] = 0;nd[i][i] = 0;}
for(const [type, u, v, cost] of edges) {
  const uIdx = cities.get(u);
  const vIdx = cities.get(v);
  const discount = discountCost(type, cost);
  d[uIdx][vIdx] = Math.min(cost, d[uIdx][vIdx]);
  d[vIdx][uIdx] = Math.min(cost, d[vIdx][uIdx]);
  nd[uIdx][vIdx] = Math.min(discount, nd[uIdx][vIdx]);
  nd[vIdx][uIdx] = Math.min(discount, nd[vIdx][uIdx]);
}

for(let k = 0; k < n; k+=1) {
  for(let i = 0; i < n; i+=1) {
    for (let j = 0; j < n; j+=1) {
      if(d[i][j] > d[i][k] + d[k][j]) {
        d[i][j] = d[i][k] + d[k][j];
      }
      if(nd[i][j] > nd[i][k] + nd[k][j]) {
        nd[i][j] = nd[i][k] + nd[k][j];
      }
    }
  }
}

let costd = 0;
let costnd = 0;
for(let i = 1; i < m; i+=1) {
  const u = cities.get(nodes[i-1]);
  const v = cities.get(nodes[i]);
  costd += d[u][v];
  costnd += nd[u][v];
}
costnd += r;
console.log(costd > costnd ? 'Yes' : 'No');