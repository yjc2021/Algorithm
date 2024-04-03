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
  const orders = input.map((line) => line.split(" ").map(Number).slice(1));
  console.log(solution(n, m, orders));
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
const solution = (n, m, orders) => {
  const graph = Array.from(Array(n + 1), () => []);
  const inDegrees = Array(n + 1).fill(0);

  orders.forEach((order) => {
    for (let i = 0; i < order.length - 1; i += 1) {
      graph[order[i]].push(order[i + 1]);
      inDegrees[order[i + 1]] += 1;
    }
  });

  function topologySort() {
    result = [];
    q = new Queue();

    for (let i = 1; i <= n; i += 1) {
      if (inDegrees[i] === 0) {
        q.enqueue(i);
      }
    }

    while (q.size()) {
      const now = q.dequeue();
      result.push(now);
      for (v of graph[now]) {
        inDegrees[v] -= 1;
        if (inDegrees[v] === 0) q.enqueue(v);
      }
    }
    if (result.length === n) return result.join("\n");
    return 0;
  }

  return topologySort();
};
