const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,r,q] = input[0].split(' ').map(Number);
const edges = input.slice(1, n).map(line => line.split(' ').map(Number));
const queries = input.slice(n, n+q).map(Number);
const visited = Array(n+1).fill(0);
const subtree = Array(n+1).fill(0);
const graph = Array.from(Array(n+1), () => []);
for(const [u,v] of edges) {
  graph[u].push(v);
  graph[v].push(u);
}

function dfs(v) {
  visited[v] = 1;
  subtree[v] = 1;

  for(const next of graph[v]) {
    if(!visited[next]) {
      subtree[v] += dfs(next);
    }
  }

  return subtree[v];
}

dfs(r);

const results = queries.map(query => subtree[query]);
console.log(results.join('\n'));