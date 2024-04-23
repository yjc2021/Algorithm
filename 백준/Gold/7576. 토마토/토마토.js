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
  const [m, n] = input.shift().split(" ").map(Number);
  const tomatoes = Array.from(Array(n), () => []);
  input.forEach((line, index) =>
    line
      .split(" ")
      .map(Number)
      .forEach((e) => tomatoes[index].push(e))
  );
  console.log(solution(m, n, tomatoes));
});

class Queue {
  constructor() {
    this.q = [];
    this.left = 0;
    this.right = 0;
  }
  enqueue(value) {
    this.q[this.right++] = value;
  }
  dequeue() {
    const del = this.q[this.left];
    delete this.q[this.left++];
    return del;
  }
  size() {
    return this.right - this.left;
  }
}

const solution = (m, n, tomatoes) => {
  const dx = [-1, 1, 0, 0],
    dy = [0, 0, -1, 1];
  const visited = Array.from(Array(n), () => Array(m).fill(0));
  const q = new Queue();

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      if (tomatoes[i][j] === 1) {
        q.enqueue([i, j]);
        visited[i][j] = 1;
      }
    }
  }
  if (q.size() === m * n) {
    return 0;
  }

  while (q.size()) {
    const [y, x] = q.dequeue();

    for (let i = 0; i < 4; i += 1) {
      const ny = y + dy[i];
      const nx = x + dx[i];
      if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
      if (visited[ny][nx]) continue;
      if (tomatoes[ny][nx] === -1 || tomatoes[ny][nx] === 1) continue;

      q.enqueue([ny, nx]);
      tomatoes[ny][nx] = 1;
      visited[ny][nx] = visited[y][x] + 1;
    }
  }

  let res = 0;

  for (let i = 0; i < n; i += 1) {
    let subMax = 0;
    for (let j = 0; j < m; j += 1) {
      if (tomatoes[i][j] === 0) return -1;
      subMax = Math.max(visited[i][j], subMax);
    }
    res = Math.max(subMax, res);
  }

  return res - 1;
};
