const dest = process.execArgv.includes("--stack-size=65536") ? 'dev/stdin' : 'input.txt';

const input = require('fs').readFileSync(dest).toString().trim().split('');

const ans = new Set();
const visited = [];
const brackets = [];
const stack = [];
const bracketPair = [];

function dfs(cnt, idx) {
  if(cnt >=1) {
    let str = "";
    input.forEach((val, idx) => {
      if(brackets[idx]) return;
      str+=val;
    })
    ans.add(str);
  }
  for(let i = idx; i < bracketPair.length; i+=1) {
    if(visited[i]) continue;
    visited[i] = true;
    brackets[bracketPair[i][0]] = true;
    brackets[bracketPair[i][1]] = true;
    dfs(cnt+1, idx+1);
    brackets[bracketPair[i][1]] = false;
    brackets[bracketPair[i][0]] = false;
    visited[i] = false;
  }
}

input.forEach((v, i) => {
  if(v === '(') stack.push(i);
  else if (v === ")") {
    bracketPair.push([stack.pop(), i]);
  }
});

dfs(0, 0);

console.log(Array.from(ans).sort().join('\n'));