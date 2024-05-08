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
  const n = Number(input.shift());
  const edges = input.map((line) => line.split(" ").map(Number));
  console.log(solution(n, edges));
});

const solution = (n, edges) => {
  const graph = Array.from(Array(n + 1), () => []);
  const checked = Array.from(Array(n + 1), () => false);
  const parents = Array.from(Array(n + 1), () => 0);
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  function dfs(v) {
    if (checked[v]) return;
    checked[v] = true;
    for (const next of graph[v]) {
      if (checked[next]) continue;
      parents[next] = v;
      dfs(next);
    }
  }

  dfs(1);

  return parents.slice(2).join("\n");
};
