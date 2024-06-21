const fs = require("fs");
let input = fs.readFileSync(0,"utf-8").toString().trim().split("\n");

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
class Node {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  enqueue(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.size += 1;
  }
  dequeue() {
    if (!this.head) return null;
    const value = this.head.value;
    this.head = this.head.next;
    this.size -= 1;
    return value;
  }
  size() {
    return this.size;
  }
  isEmpty() {
    return !this.size;
  }
}

const [n, m, p] = input[0].split(" ").map(Number);
const sList = input[1].split(" ").map(Number);
const board = input.slice(2).map((line) => line.trim().split(""));
const answer = Array(p + 1).fill(0);
const player = Array.from(Array(p + 1), () => []);

for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < m; j += 1) {
    if (board[i][j] !== "." && board[i][j] !== "#") {
      player[+board[i][j]].push([i, j]);
    }
  }
}

const qList = Array.from(Array(p + 1), () => new Queue());
for (let i = 1; i <= p; i += 1) {
  for (const [y, x] of player[i]) {
    qList[i].enqueue([y, x]);
    answer[i] += 1;
  }
}
while (true) {
  let flag = false;
  for (let i = 1; i <= p; i += 1) {
    let s = sList[i - 1];
    while (!qList[i].isEmpty() && s--) {
      const qSize = qList[i].size;
      for (let j = 0; j < qSize; j += 1) {
        const [y, x] = qList[i].dequeue();
        for (const [dy, dx] of dir) {
          const ny = y + dy;
          const nx = x + dx;
          if (ny < 0 || ny >= n || nx < 0 || nx >= m || board[ny][nx] !== ".")
            continue;
          board[ny][nx] = `${i}`;
          qList[i].enqueue([ny, nx]);
          answer[i] += 1;
          flag = true;
        }
      }
    }
  }
  if (!flag) break;
}

console.log(answer.slice(1).join(" "));
