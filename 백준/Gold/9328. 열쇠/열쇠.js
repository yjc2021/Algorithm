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
    this.size = 0;
    this.head = null;
    this.tail = null;
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

let t = +input[0];
const answer = [];

let index = 1;
while (t--) {
  const [h, w] = input[index].split(" ").map(Number);

  const building = [
    Array(w + 2).fill("."),
    ...input
      .slice(index + 1, index + 1 + h)
      .map((line) => [".", ...line.split(""), "."]),
    Array(w + 2).fill("."),
  ];

  let kList = input[index + 1 + h].trim().split("");
  if (kList[0] === "0") kList = [];

  const keys = {};
  for (const key of kList) {
    keys[key] = true;
  }

  answer.push(solution(h, w, building, keys));
  index += 1 + h + 1;
}
console.log(answer.join("\n"));

function solution(h, w, building, keys) {
  let visited = Array.from(Array(h + 2), () => Array(w + 2).fill(false));
  const visitedDoc = [];
  const q = new Queue();
  let cnt = 0;

  visited[0][0] = true;
  q.enqueue([0, 0]);

  while (!q.isEmpty()) {
    const [cy, cx] = q.dequeue();

    for (const [dy, dx] of dir) {
      const ny = cy + dy;
      const nx = cx + dx;

      if (ny < 0 || nx < 0 || ny >= h + 2 || nx >= w + 2) continue;
      if (visited[ny][nx] || building[ny][nx] === "*") continue;

      if (building[ny][nx] >= "A" && building[ny][nx] <= "Z") {
        if (!keys[building[ny][nx].toLowerCase()]) continue;
      } else if (building[ny][nx] >= "a" && building[ny][nx] <= "z") {
        if (!keys[building[ny][nx]]) {
          keys[building[ny][nx]] = true;
          visited = Array.from(Array(h + 2), () => Array(w + 2).fill(false));
        }
      } else if (
        building[ny][nx] === "$" &&
        !visitedDoc.some(([y, x]) => y === ny && x === nx)
      ) {
        visitedDoc.push([ny, nx]);
        cnt += 1;
      }
      visited[ny][nx] = true;
      q.enqueue([ny, nx]);
    }
  }
  return cnt;
}
