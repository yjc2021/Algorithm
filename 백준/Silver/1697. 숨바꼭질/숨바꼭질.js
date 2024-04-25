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
  const [n, k] = input.shift().split(" ").map(Number);
  console.log(solution(n, k));
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

const solution = (n, k) => {
  const dx = [-1, 1, 2];
  const visited = Array(200001).fill(0);
  const q = new Queue();

  visited[n] = 1;
  q.enqueue(n);

  while (q.size()) {
    const cur = q.dequeue();

    for (let i = 0; i < 3; i += 1) {
      let next;
      if (i === 2) {
        next = cur * dx[2];
      } else {
        next = cur + dx[i];
      }

      if (next < 0 || next > 100000) continue;
      if (visited[next]) continue;
      q.enqueue(next);
      visited[next] = visited[cur] + 1;
    }
  }
  return visited[k] - 1;
};
