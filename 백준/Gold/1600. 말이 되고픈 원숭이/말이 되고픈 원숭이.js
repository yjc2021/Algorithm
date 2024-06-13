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
  const k = +input[0];
  const [w, h] = input[1].split(" ").map(Number);
  const map = Array.from(Array(h), () => Array(w));
  for (let i = 2; i < 2 + h; i += 1) {
    const temp = input[i].split(" ").map(Number);
    for (let j = 0; j < w; j += 1) {
      map[i - 2][j] = temp[j];
    }
  }
  console.log(solution(k, w, h, map));
});

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const horseDir = [
  [-2, 1],
  [2, 1],
  [-2, -1],
  [2, -1],
  [1, -2],
  [1, 2],
  [-1, 2],
  [-1, -2],
];

function isOutOfBounds(y, x, maxY, maxX) {
  return y < 0 || x < 0 || y >= maxY || x >= maxX;
}
const solution = (k, w, h, map) => {
  const visited = Array.from(Array(h), () =>
    Array.from(Array(w), () => Array(k).fill(0))
  );

  const q = new Queue();
  q.enqueue([0, 0, 0]);
  visited[0][0][0] = 1;

  while (q.size()) {
    const [cy, cx, horse] = q.dequeue();

    if (cy === h - 1 && cx === w - 1) {
      return visited[cy][cx][horse] - 1;
    }
    for (const [yy, xx] of dir) {
      const [ny, nx] = [cy + yy, cx + xx];
      if (isOutOfBounds(ny, nx, h, w)) continue;
      if (visited[ny][nx][horse] || map[ny][nx] === 1) continue;

      q.enqueue([ny, nx, horse]);
      visited[ny][nx][horse] = visited[cy][cx][horse] + 1;
    }

    if (horse >= k) continue;

    for (const [yy, xx] of horseDir) {
      const [ny, nx] = [cy + yy, cx + xx];
      if (isOutOfBounds(ny, nx, h, w)) continue;
      if (visited[ny][nx][horse + 1] || map[ny][nx] === 1) continue;

      q.enqueue([ny, nx, horse + 1]);
      visited[ny][nx][horse + 1] = visited[cy][cx][horse] + 1;
    }
  }

  return -1;
};

class Queue {
  constructor() {
    this.q = [];
    this.head = 0;
    this.tail = 0;
  }
  enqueue(value) {
    this.q[this.tail++] = value;
  }
  dequeue() {
    const del = this.q[this.head];
    delete this.q[this.head++];
    return del;
  }
  size() {
    return this.tail - this.head;
  }
}
