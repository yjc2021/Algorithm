const fs = require("fs");
let input = fs.readFileSync(0,"utf-8").toString().trim().split("\n");

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

const [n, m] = input[0].split(" ").map(Number);
const board = Array.from(Array(n + 1), () =>
  Array.from(Array(n + 1), () => [])
);
for (let i = 0; i < m; i += 1) {
  const [y, x, b, a] = input[i + 1].split(" ").map(Number);
  board[y][x].push([b, a]);
}
const visited = Array.from(Array(n + 1), () => Array(n + 1).fill(false));
const on = Array.from(Array(n + 1), () => Array(n + 1).fill(false));
const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
console.log(BFS());

function BFS() {
  let cnt = 0;

  const q = new Queue();
  q.enqueue([1, 1]);
  visited[1][1] = true;
  on[1][1] = true;
  cnt += 1;

  for (const [y, x] of board[1][1]) {
    if (!on[y][x]) {
      on[y][x] = true;
      cnt += 1;
    }
  }
  while (!q.isEmpty()) {
    const [cy, cx] = q.dequeue();
    for (const [y, x] of board[cy][cx]) {
      if (!on[y][x]) {
        on[y][x] = true;
        cnt += 1;
        for (const [yy, xx] of dir) {
          const [ny, nx] = [y + yy, x + xx];
          if (nx < 1 || nx > n || ny < 1 || ny > n) continue;
          if (visited[ny][nx]) {
            q.enqueue([y, x]);
            visited[y][x] = true;
            break;
          }
        }
      }
    }
    for (const [yy, xx] of dir) {
      const [ny, nx] = [cy + yy, cx + xx];
      if (nx < 1 || nx > n || ny < 1 || ny > n) continue;
      if (!on[ny][nx] || visited[ny][nx]) continue;
      q.enqueue([ny, nx]);
      visited[ny][nx] = true;
    }
  }
  return cnt;
}
