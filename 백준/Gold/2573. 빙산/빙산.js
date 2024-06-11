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
  const arr = input.map((line) => line.split(" ").map(Number));
  console.log(solution(n, m, arr));
});

const solution = (n, m, arr) => {
  const dir = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let visited;
  let answer = 0;

  while (true) {
    let cnt = 0;
    visited = Array.from(Array(n), () => Array(m).fill(false));

    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < m; j += 1) {
        if (!arr[i][j] || visited[i][j]) continue;
        cnt += 1;
        bfs(i, j);
      }
    }

    if (cnt === 0) return 0;
    if (cnt >= 2) return answer;

    const copy = Array.from(Array(n), () => Array(m).fill(0));

    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < m; j += 1) {
        if (!arr[i][j]) continue;
        copy[i][j] = arr[i][j] - getSeaArea(i, j);
        if (copy[i][j] < 0) copy[i][j] = 0;
      }
    }

    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < m; j += 1) {
        arr[i][j] = copy[i][j];
      }
    }
    answer += 1;
  }

  function bfs(i, j) {
    const q = new Queue();
    q.enqueue([i, j]);
    visited[i][j] = true;

    while (q.size()) {
      const [cy, cx] = q.dequeue();

      for (const [yy, xx] of dir) {
        const ny = cy + yy;
        const nx = cx + xx;

        if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
        if (!arr[ny][nx] || visited[ny][nx]) continue;
        q.enqueue([ny, nx]);
        visited[ny][nx] = true;
      }
    }
  }
  function getSeaArea(y, x) {
    let area = 0;

    for (const [yy, xx] of dir) {
      const ny = y + yy;
      const nx = x + xx;
      if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;
      if (arr[ny][nx] === 0) area += 1;
    }
    return area;
  }
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
