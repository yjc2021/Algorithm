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
  const [m, n, h] = input.shift().split(" ").map(Number);
  const parsedTomatoInput = input.map((line) => line.split(" ").map(Number));
  const tomatoes = Array.from(Array(h), () => Array.from(Array(n), () => []));
  const ripeTomatoes = [];
  for (let i = 0; i < h; i += 1) {
    for (let j = 0; j < n; j += 1) {
      for (let k = 0; k < m; k += 1) {
        tomatoes[i][j].push(parsedTomatoInput[i * n + j][k]);
        if (parsedTomatoInput[i * n + j][k] === 1) {
          ripeTomatoes.push([i, j, k]);
        }
      }
    }
  }
  console.log(solution(n, m, h, tomatoes, ripeTomatoes));
});

class Queue {
  constructor() {
    this.q = [];
    this.front = 0;
    this.rear = 0;
  }
  enqueue(value) {
    this.q[this.rear++] = value;
  }
  dequeue() {
    const del = this.q[this.front];
    delete this.q[this.front++];
    return del;
  }
  size() {
    return this.rear - this.front;
  }
}

const solution = (n, m, h, tomatoes, ripeTomatoes) => {
  const dx = [-1, 1, 0, 0, 0, 0];
  const dy = [0, 0, -1, 1, 0, 0];
  const dz = [0, 0, 0, 0, -1, 1];
  const visited = Array.from(Array(h), () =>
    Array.from(Array(n), () => Array(m).fill(0))
  );
  const q = new Queue();

  if (ripeTomatoes.length === n * m * h) return 0;

  ripeTomatoes.forEach(([h, y, x]) => {
    visited[h][y][x] = 1;
    q.enqueue([h, y, x]);
  });

  while (q.size()) {
    const [ch, cy, cx] = q.dequeue();

    for (let i = 0; i < 6; i += 1) {
      const nh = ch + dz[i];
      const ny = cy + dy[i];
      const nx = cx + dx[i];

      if (nh < 0 || nh >= h || ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
      if (visited[nh][ny][nx]) continue;
      if (tomatoes[nh][ny][nx] !== 0) continue;

      tomatoes[nh][ny][nx] = 1;
      visited[nh][ny][nx] = visited[ch][cy][cx] + 1;
      q.enqueue([nh, ny, nx]);
    }
  }

  let max = 0;
  for (let i = 0; i < h; i += 1) {
    for (let j = 0; j < n; j += 1) {
      for (let k = 0; k < m; k += 1) {
        if (tomatoes[i][j][k] === 0) return -1;
        max = Math.max(max, visited[i][j][k]);
      }
    }
  }

  return max - 1;
};
