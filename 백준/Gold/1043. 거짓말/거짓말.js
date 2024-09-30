const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n,m] = input[0].split(' ').map(Number);
const [truthCnt, ...truth] = input[1].split(' ').map(Number);

const parties = input.slice(2, m+2).map(line => {
  const [cnt, ...rest] = line.split(' ').map(Number);;
  return rest;
});

const graph = Array.from(Array(n+1), () => []);
const visited = Array(n+1).fill(0);

for(party of parties) {
  if(party.length <= 1) continue;
  for(let i = 0; i < party.length-1; i+=1) {
    graph[party[i]].push(party[i+1]);
    graph[party[i+1]].push(party[i]);
  }
}

function dfs(v) {
  const stack = [];
  
  stack.push(v);
  visited[v] = 1;

  while(stack.length) {
    const cur = stack.pop();
    for(next of graph[cur]) {
      if(!visited[next]) {
        visited[next] = 1;
        stack.push(next);
      }
    }
  }
}

for(member of truth) {
  if(visited[member]) continue;
  dfs(member);
}

let ans = 0;

for(party of parties) {
  if(party.some(v => visited[v])) continue;
  ans+=1;
}
console.log(ans);