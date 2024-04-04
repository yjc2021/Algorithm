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
  const people = input.shift().split(" ");
  const m = Number(input.shift());
  const heritage = input.map((line) => line.split(" "));
  console.log(solution(n, people, m, heritage));
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

const solution = (n, people, m, heritage) => {
  const ans = [];
  const nameTable = new Map();
  people.sort();

  people.forEach((person, index) => nameTable.set(person, index));

  const inDegrees = Array(n).fill(0);
  const graph = Array.from(Array(n), () => []);

  heritage.forEach(([x, y]) => {
    graph[nameTable.get(y)].push(nameTable.get(x));
    inDegrees[nameTable.get(x)] += 1;
  });

  const root = [];
  const children = Array.from(Array(n), () => []);
  const q = new Queue();

  for (let i = 0; i < n; i += 1) {
    if (inDegrees[i] === 0) {
      root.push(i);
      q.enqueue(i);
    }
  }
  while (q.size()) {
    const now = q.dequeue();
    for (const v of graph[now]) {
      inDegrees[v] -= 1;
      if (inDegrees[v] === 0) {
        q.enqueue(v);
        children[now].push(v);
      }
    }
  }

  ans.push(root.length);
  ans.push(root.map((v) => people[v]).join(" "));

  for (let i = 0; i < n; i += 1) {
    ans.push(
      `${people[i]} ${children[i].length} ${children[i]
        .sort()
        .map((v) => people[v])
        .join(" ")}`
    );
  }

  return ans.join("\n");
};
