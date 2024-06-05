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

  for (let i = 0; i < t; i += 1) {
    const [w, h] = input.shift().split(" ").map(Number);
    const arr = [];
    for (let j = 0; j < h; j += 1) {
      arr.push(input.shift().split(""));
    }
    console.log(solution(w, h, arr));
  }
});

const outOfBounds = (y, x, w, h) => y < 0 || x < 0 || y >= h || x >= w;
const isGoal = (y, x, w, h) => y === 0 || y === h - 1 || x === 0 || x === w - 1;
const solution = (w, h, arr) => {
  let q = new Queue();
  let fireQ = new Queue();
  let flag = false;
  let cnt = 0;
  const next = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const visited = Array.from(Array(h), () => Array(w).fill(0));

  const fireBFS = () => {
    const tempQ = new Queue();
    while (fireQ.size()) {
      const [y, x] = fireQ.dequeue();
      for (const [yy, xx] of next) {
        const ny = y + yy;
        const nx = x + xx;

        if (outOfBounds(ny, nx, w, h)) continue;
        if (arr[ny][nx] === "#" || arr[ny][nx] === "*") continue;

        arr[ny][nx] = "*";
        tempQ.enqueue([ny, nx]);
      }
    }
    fireQ = tempQ;
  };
  const BFS = () => {
    const tempQ = new Queue();
    while (q.size()) {
      const [y, x] = q.dequeue();
      if (isGoal(y, x, w, h)) flag = true;
      for (const [yy, xx] of next) {
        const ny = y + yy;
        const nx = x + xx;

        if (outOfBounds(ny, nx, w, h)) continue;
        if (arr[ny][nx] !== "." || visited[ny][nx]) continue;

        visited[ny][nx] = 1;
        tempQ.enqueue([ny, nx]);
      }
    }
    q = tempQ;
    return tempQ.size() !== 0;
  };

  for (let i = 0; i < h; i += 1) {
    for (let j = 0; j < w; j += 1) {
      if (arr[i][j] === "@") {
        visited[i][j] = 1;
        q.enqueue([i, j]);
      } else if (arr[i][j] === "*") {
        fireQ.enqueue([i, j]);
      }
    }
  }

  while (!flag) {
    cnt += 1;
    fireBFS();
    if (!BFS()) break;
  }
  return flag ? cnt : "IMPOSSIBLE";
};

class Queue {
  constructor() {
    this.q = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(x) {
    this.q[this.rear++] = x;
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
