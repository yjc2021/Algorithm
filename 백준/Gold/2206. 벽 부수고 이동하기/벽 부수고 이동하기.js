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
  const arr = input.map((line) => line.split("").map(Number));
  console.log(solution(n, m, arr));
});

const solution = (n, m, arr) => {
  const next = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  return BFS();

  function BFS() {
    const visited = Array.from(Array(n), () =>
      Array.from(Array(m), () => Array(2).fill(0))
    );
    const q = new Queue();
    q.enqueue([0, 0, 0]);
    visited[0][0][0] = 1;

    while (q.size()) {
      const [cy, cx, cBroken] = q.dequeue();

      if (cy === n - 1 && cx === m - 1) {
        return visited[cy][cx][cBroken];
      }
      for (const [yy, xx] of next) {
        const ny = cy + yy;
        const nx = cx + xx;

        if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;

        if (!arr[ny][nx] && !visited[ny][nx][cBroken]) {
          visited[ny][nx][cBroken] = visited[cy][cx][cBroken] + 1;
          q.enqueue([ny, nx, cBroken]);
        } else if (arr[ny][nx] && !cBroken) {
          visited[ny][nx][1] = visited[cy][cx][cBroken] + 1;
          q.enqueue([ny, nx, 1]);
        }
      }
    }
    return -1;
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
