const fs = require("node:fs");
const readline = require("readline");
const dest = process.execArgv.includes("--stack-size=65536")
  ? process.stdin
  : fs.createReadStream("input.txt", "utf-8");
const rl = readline.createInterface({
  input: dest,
  output: process.stdout,
});
const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  let t = input[0];
  let index = 1;
  while (t--) {
    const n = Number(input[index]);
    const graph = [0, ...input[index + 1].split(" ").map(Number)];

    console.log(solution(n, graph));
    index += 2;
  }
});

const solution = (n, graph) => {
  const visited = Array(n + 1).fill(false);
  const recStack = Array(n + 1).fill(false);
  let count = 0;

  function dfs(start) {
    visited[start] = true;
    recStack[start] = true;

    let next = graph[start];

    if (!visited[next]) {
      dfs(next);
    } else if (recStack[next]) {
      while (next !== start) {
        count += 1;
        next = graph[next];
      }
      count += 1;
    }
    recStack[start] = false;
  }

  for (let i = 1; i <= n; i += 1) {
    if (!visited[i]) {
      dfs(i);
    }
  }
  return n - count;
};
