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
  const colors = input.map((line) => line.trim().split(""));
  const weakColors = colors.map((line) =>
    line.map((v) => (v === "G" ? "R" : v))
  );
  console.log(solution(n, colors, weakColors));
});

const solution = (n, colors, weakColors) => {
  let visited = Array.from(Array(n), () => Array(n).fill(0));
  const dx = [-1, 1, 0, 0],
    dy = [0, 0, -1, 1];

  const dfs = (y, x, arr) => {
    visited[y][x] = 1;

    for (let i = 0; i < 4; i += 1) {
      const ny = y + dy[i];
      const nx = x + dx[i];

      if (ny < 0 || nx < 0 || ny >= n || nx >= n) continue;
      if (visited[ny][nx]) continue;
      if (arr[y][x] !== arr[ny][nx]) continue;
      dfs(ny, nx, arr);
    }
  };

  let normal = 0,
    colorBlind = 0;

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (visited[i][j]) continue;
      dfs(i, j, colors);
      normal += 1;
    }
  }
  visited = Array.from(Array(n), () => Array(n).fill(0));
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (visited[i][j]) continue;
      dfs(i, j, weakColors);
      colorBlind += 1;
    }
  }
  return [normal, colorBlind].join(" ");
};
