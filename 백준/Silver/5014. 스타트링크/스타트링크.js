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
  const [F, S, G, U, D] = input.shift().split(" ").map(Number);
  console.log(solution(F, S, G, U, D));
});

const solution = (F, S, G, U, D) => {
  const next = [U, -D];
  const visited = Array(F + 1).fill(0);

  const BFS = (f) => {
    const q = new Queue();
    q.enqueue(f);
    visited[f] = 1;
    while (q.size()) {
      const curF = q.dequeue();
      for (const ff of next) {
        const nextF = curF + ff;
        if (outOfBounds(nextF, 1, F)) continue;
        if (hasVisited(nextF, visited)) continue;

        q.enqueue(nextF);
        visited[nextF] = visited[curF] + 1;
      }
    }
  };

  BFS(S);
  return visited[G] === 0 ? "use the stairs" : visited[G] - 1;
};

const outOfBounds = (f, min, max) => f < min || f > max;
const hasVisited = (f, visited) => visited[f] >= 1;

class Queue {
  constructor() {
    this.q = [];
    this.rear = 0;
    this.front = 0;
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
