const path = process.platform === 'linux' ? [0,'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const v = Number(input[0]);
const tree = Array.from({length: v+1}, () => []);
const edges = input.slice(1, 1+v).forEach(line => {
  const tmp = line.split(' ').map(Number);
  const node = tmp[0];
  for(let i = 1; i < tmp.length-1; i+=2) {
    tree[node].push([tmp[i], tmp[i+1]])
  }
})

let max = {node: 0, dist: 0};

function dfs(v) {
  const visited = Array(v+1).fill(0);
  const stack = [];
  stack.push([v,0]);
  visited[v] = 1;
  while(stack.length) {
    const [cur, cDist] = stack.pop();
    if(max.dist < cDist) max = {node: cur, dist: cDist};
    for(const [next, nDist] of tree[cur]) {
      if(visited[next]) continue;
      visited[next] = 1;
      stack.push([next, cDist + nDist]);
    }
  }
}

dfs(1);
dfs(max.node);
console.log(max.dist);