const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const n = Number(input[0]);
const edges = input.slice(1,n).map(line => line.split(' ').map(Number));

const tree = Array.from(Array(n+1), () => []);

for(const [from, to, weight] of edges) {
  tree[from].push([to, weight]);
  tree[to].push([from, weight]);
}

let max = {node: 0, dist: 0};

function dfs(v) {
  const visited = Array(n+1).fill(0);
  const stack = [];
  stack.push([v, 0]);
  visited[v] = 1;

  while(stack.length){
    const [cur, cDist] = stack.pop();
    if(max.dist < cDist) {
      max = {node: cur, dist: cDist};
    }
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