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
  const [n, m] = input.shift().split(" ").map(Number);
  const matrix = Array.from(Array(n), () => []);
  input.forEach((line, index) =>
    line
      .split(" ")
      .map(Number)
      .forEach((e) => matrix[index].push(e))
  );
  console.log(solution(n, m, matrix));
});

const solution = (n, m, matrix) => {
  const visited = Array.from(Array(n), () => Array(m).fill(0));
  const dy = [1, -1, 0, 0],
    dx = [0, 0, 1, -1];
  let max = 0,
    cnt = 0;

  const dfs = (y, x) => {
    visited[y][x] = 1;
    let area = 1;
    for (let i = 0; i < 4; i += 1) {
      const ny = y + dy[i],
        nx = x + dx[i];
      if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
      if (visited[ny][nx] || !matrix[ny][nx]) continue;

      area += dfs(ny, nx);
    }
    return area;
  };

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      if (!visited[i][j] && matrix[i][j]) {
        cnt += 1;
        max = Math.max(dfs(i, j), max);
      }
    }
  }
  return [cnt, max].join("\n");
};
