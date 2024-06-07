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
  while (true) {
    const [l, r, c] = input.shift().split(" ").map(Number);
    if (l === 0 && r === 0 && c === 0) break;

    let start, end;
    const building = [];
    for (let i = 0; i < l; i += 1) {
      const floor = [];
      for (let j = 0; j < r; j += 1) {
        const a = input.shift().split("");
        const st = a.findIndex((e) => e === "S");
        const en = a.findIndex((e) => e === "E");
        if (st !== -1) {
          start = [i, j, st];
        }
        if (en !== -1) {
          end = [i, j, en];
        }
        floor.push(a);
      }
      building.push(floor);
      input.shift();
    }
    console.log(solution(l, r, c, building, start, end));
  }
});

const solution = (l, r, c, building, start, end) => {
  const dz = [-1, 1, 0, 0, 0, 0],
    dy = [0, 0, -1, 1, 0, 0],
    dx = [0, 0, 0, 0, -1, 1];
  const visited = Array.from(Array(l), () =>
    Array.from(Array(r), () => Array(c).fill(0))
  );

  const ans = BFS(start);
  return ans === -1 ? "Trapped!" : `Escaped in ${ans} minute(s).`;

  function BFS(start) {
    const q = new Queue();
    q.enqueue(start);
    const [z, y, x] = start;
    visited[z][y][x] = 1;
    while (q.size()) {
      const [cz, cy, cx] = q.dequeue();
      for (let i = 0; i < 6; i += 1) {
        const nz = cz + dz[i];
        const ny = cy + dy[i];
        const nx = cx + dx[i];
        if (nz < 0 || ny < 0 || nx < 0 || nz >= l || ny >= r || nx >= c)
          continue;
        if (visited[nz][ny][nx]) continue;
        if (building[nz][ny][nx] === "#") continue;
        q.enqueue([nz, ny, nx]);
        visited[nz][ny][nx] = visited[cz][cy][cx] + 1;
      }
    }
    const [ez, ey, ex] = end;
    return visited[ez][ey][ex] - 1;
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
