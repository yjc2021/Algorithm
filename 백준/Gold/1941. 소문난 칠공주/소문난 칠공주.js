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
  const map = Array.from(Array(5), () => []);
  input.forEach((line, idx) =>
    line
      .trim()
      .split("")
      .forEach((s) => map[idx].push(s))
  );
  console.log(solution(map));
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
const solution = (map) => {
  let ans = 0;
  const selected = [];

  function bfs(selected) {
    const visited = Array.from(Array(5), () => Array(5).fill(true));
    for (const [y, x] of selected) {
      visited[y][x] = false;
    }
    const q = new Queue();
    const dx = [0, 0, -1, 1],
      dy = [-1, 1, 0, 0];
    let adjacentCnt = 1;
    q.enqueue(selected[0]);
    visited[selected[0][0]][selected[0][1]] = true;
    while (q.size()) {
      const [y, x] = q.dequeue();

      for (let i = 0; i < 4; i += 1) {
        const ny = y + dy[i];
        const nx = x + dx[i];

        if (ny < 0 || nx < 0 || ny >= 5 || nx >= 5) continue;
        if (visited[ny][nx]) continue;
        adjacentCnt += 1;
        q.enqueue([ny, nx]);
        visited[ny][nx] = true;
      }
    }
    return adjacentCnt === 7;
  }

  function dfs(cur, cntY) {
    if (cntY >= 4) return;

    if (selected.length === 7) {
      if (bfs(selected)) ans += 1;
      return;
    }
    for (let i = cur; i < 25; i += 1) {
      let y = Math.floor(i / 5);
      let x = i % 5;

      selected.push([y, x]);
      dfs(i + 1, cntY + (map[y][x] === "Y" ? 1 : 0));
      selected.pop();
    }
  }
  dfs(0, 0);
  return ans;
};
