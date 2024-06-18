const input = require("fs")
  .readFileSync(0,"utf-8")
  .toString()
  .trim()
  .split("\n");

const [n, m, k] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((line) => line.split("").map(Number));

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }
  enqueue(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.size += 1;
  }
  dequeue() {
    if (!this.head) return null;

    const value = this.head.value;
    this.head = this.head.next;
    this.size -= 1;
    return value;
  }
  isEmpty() {
    return !this.size;
  }
}
const visited = Array.from(Array(n), () =>
  Array.from(Array(m), () => Array(k + 1).fill(false))
);
console.log(BFS());

function BFS() {
  const q = new Queue();
  visited[0][0][0] = 1;
  q.enqueue([0, 0, 0, 1]);

  if (n === 1 && m === 1) return 1;
  while (!q.isEmpty()) {
    const [cy, cx, broken, dist] = q.dequeue();
    const day = dist % 2;
    for (const [dy, dx] of dir) {
      const [ny, nx] = [cy + dy, cx + dx];
      if (ny < 0 || nx < 0 || ny >= n || nx >= m) continue;

      if (ny === n - 1 && nx === m - 1) {
        return dist + 1;
      }
      if (arr[ny][nx] === 0 && !visited[ny][nx][broken]) {
        visited[ny][nx][broken] = true;
        q.enqueue([ny, nx, broken, dist + 1]);
      } else if (
        arr[ny][nx] === 1 &&
        broken < k &&
        !visited[ny][nx][broken + 1]
      ) {
        if (day) {
          visited[ny][nx][broken + 1] = true;
          q.enqueue([ny, nx, broken + 1, dist + 1]);
        } else {
          q.enqueue([cy, cx, broken, dist + 1]);
        }
      }
    }
  }
  return -1;
}
