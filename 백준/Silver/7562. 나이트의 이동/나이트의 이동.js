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
  const t = Number(input.shift());
  const l = [];
  const curPos = [];
  const targetPos = [];
  for (let i = 0; i < t; i += 1) {
    l.push(Number(input.shift()));
    curPos.push(input.shift().split(" ").map(Number));
    targetPos.push(input.shift().split(" ").map(Number));
  }
  console.log(solution(t, l, curPos, targetPos));
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
const solution = (t, l, curPos, targetPos) => {
  const dy = [2, 1, -1, -2, -2, -1, 1, 2];
  const dx = [1, 2, 2, 1, -1, -2, -2, -1];
  const ans = [];
  for (let i = 0; i < t; i += 1) {
    const q = new Queue();
    const len = l[i];
    const visited = Array.from(Array(len), () => Array(len).fill(0));

    const [x, y] = curPos[i];
    const [tx, ty] = targetPos[i];

    visited[y][x] = 1;
    q.enqueue([y, x]);

    while (q.size()) {
      const [cy, cx] = q.dequeue();

      for (j = 0; j < 8; j += 1) {
        const ny = cy + dy[j];
        const nx = cx + dx[j];

        if (ny < 0 || nx < 0 || ny >= len || nx >= len) continue;
        if (visited[ny][nx]) continue;

        visited[ny][nx] = visited[cy][cx] + 1;
        q.enqueue([ny, nx]);
      }
    }

    ans.push(visited[ty][tx] - 1);
  }
  return ans.join("\n");
};
