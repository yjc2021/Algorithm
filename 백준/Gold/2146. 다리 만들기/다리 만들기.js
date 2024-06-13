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
  const n = +input.shift();
  const arr = input.map((line) => line.split(" ").map(Number));
  console.log(solution(n, arr));
});

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function isInRange(y, x, max) {
  return y < 0 || x < 0 || y >= max || x >= max;
}
const solution = (n, arr) => {
  let ans = Infinity;

  let visited = Array.from(Array(n), () => Array(n).fill(0));

  function dfs(y, x, islandNumber) {
    arr[y][x] = islandNumber;
    visited[y][x] = 1;

    for (const [yy, xx] of dir) {
      const ny = y + yy;
      const nx = x + xx;

      if (isInRange(ny, nx, n)) continue;
      if (visited[ny][nx] || !arr[ny][nx]) continue;

      dfs(ny, nx, islandNumber);
    }
  }

  function connectIslands(island, visitedIsland) {
    visited = Array.from(Array(n), () => Array(n).fill(0));
    const q = new Queue();
    let isBorder = false;
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        if (visited[i][j] || island !== arr[i][j]) continue;

        visited[i][j] = 1;
        for (let [yy, xx] of dir) {
          const ny = yy + i;
          const nx = xx + j;

          if (isInRange(ny, nx, n)) continue;
          if (visited[ny][nx] || arr[ny][nx] !== 0) continue;
          isBorder = true;
        }
        if (isBorder) {
          q.enqueue([i, j, 0]);
          isBorder = false;
        }
      }
    }

    while (q.size()) {
      const [cy, cx, count] = q.dequeue();
      for (const [yy, xx] of dir) {
        const ny = yy + cy;
        const nx = xx + cx;

        if (isInRange(ny, nx, n)) continue;
        if (visited[ny][nx]) continue;

        if (arr[ny][nx] === 0) {
          q.enqueue([ny, nx, count + 1]);
          visited[ny][nx] = 1;
        } else if (arr[ny][nx] !== island && !visitedIsland[island]) {
          ans = Math.min(ans, count);
        }
      }
    }
  }

  let islandNumber = 1;
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (visited[i][j] || !arr[i][j]) continue;
      dfs(i, j, islandNumber);
      islandNumber += 1;
    }
  }

  const visitedIsland = Array(islandNumber).fill(0);
  for (let i = 1; i < islandNumber; i += 1) {
    connectIslands(i, visitedIsland);
    visitedIsland[i] = 1;
  }

  return ans;
};

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
