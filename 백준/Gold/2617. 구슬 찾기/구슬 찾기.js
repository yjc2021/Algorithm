const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt']
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);
const edges = input.slice(1,m+1).map(line => line.split(' ').map(Number));
const heavy = Array.from(Array(n+1), () => []);
const light = Array.from(Array(n+1), () => []);

for(edge of edges) {
  const [heavier, lighter] = edge;
  heavy[heavier].push(lighter);
  light[lighter].push(heavier);
}

function dfs(v, graph) {
  let cnt = 0;
  const visited = Array(n+1).fill(false);
  const stack = [];

  stack.push(v);
  visited[v] = true;

  while(stack.length) {
    const cur = stack.pop();
    for(next of graph[cur]) {
      if(!visited[next]) {
        visited[next] = true;
        stack.push(next);
        cnt += 1;
      }
    }
  }
  return cnt;
}

const mid = Math.floor(n/2);
let ans = 0;

for(let i = 1; i <= n; i+=1) {
  
  const lightCnt = dfs(i, light);
  const heavyCnt = dfs(i, heavy);

  if(lightCnt > mid || heavyCnt > mid) ans+=1;
}

console.log(ans);