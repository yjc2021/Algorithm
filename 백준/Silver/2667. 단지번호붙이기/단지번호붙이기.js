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
  const arr = input.map((line) => line.split("").map(Number));
  console.log(solution(n, arr));
});

const solution = (n, arr) => {
  const dx = [0, 0, -1, 1],
    dy = [-1, 1, 0, 0];
  const groups = [];
  const visited = Array.from(Array(n), () => Array(n).fill(0));
  let cnt = 0;

  function dfs(y, x) {
    visited[y][x] = 1;
    cnt += 1;
    for (let i = 0; i < 4; i += 1) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      if (ny < 0 || nx < 0 || ny >= n || nx >= n) continue;
      if (visited[ny][nx]) continue;
      if (arr[ny][nx] === 0) continue;
      dfs(ny, nx);
    }
  }

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (arr[i][j] === 0) continue;
      if (visited[i][j]) continue;
      dfs(i, j);
      groups.push(cnt);
      cnt = 0;
    }
  }

  return [groups.length, ...groups.sort((a, b) => a - b)].join("\n");
};
