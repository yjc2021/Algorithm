const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const n = Number(input[0]);
const edges = input.slice(1, n).map(line => line.split(' ').map(Number));

const tree = Array.from(Array(n+1), () => []);
for(const [u, v] of edges) {
  tree[u].push(v);
  tree[v].push(u);
}

const visited = Array(n+1).fill(0);
const dp = Array.from(Array(n+1), () => Array(2).fill(0));

function dfs(cur) {
  visited[cur] = 1;
  dp[cur][1] = 1;

  for(const next of tree[cur]) {
    if(visited[next]) continue;
    dfs(next);

    dp[cur][0] += dp[next][1];
    dp[cur][1] += Math.min(dp[next][0], dp[next][1]);
  }
}

dfs(1);
console.log(Math.min(dp[1][0], dp[1][1]))