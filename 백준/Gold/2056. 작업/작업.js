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
  const n = Number(input.shift());
  const cost = Array(n + 1).fill(0);
  const graph = Array.from(Array(n + 1), () => []);
  const inDegrees = Array(n + 1).fill(0);
  input.map((line, idx) => {
    const [nCost, number, ...works] = line.split(" ");
    cost[idx + 1] = Number(nCost);
    if (number) {
      works.forEach((work) => {
        work = Number(work);
        graph[idx + 1].push(work);
        inDegrees[work] += 1;
      });
    }
  });
  console.log(solution(n, cost, inDegrees, graph));
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

const solution = (n, cost, inDegrees, graph) => {
  const q = new Queue();
  const finishTime = Array(n + 1).fill(0);
  for (let i = 1; i <= n; i += 1) {
    if (inDegrees[i] === 0) {
      q.enqueue(i);
      finishTime[i] = cost[i];
    }
  }

  while (q.size()) {
    const now = q.dequeue();
    for (const next of graph[now]) {
      inDegrees[next] -= 1;
      finishTime[next] = Math.max(
        finishTime[next],
        finishTime[now] + cost[next]
      );
      if (inDegrees[next] === 0) q.enqueue(next);
    }
  }

  return Math.max(...finishTime);
};
