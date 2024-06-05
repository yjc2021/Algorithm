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
  let i = 1;
  while (true) {
    const [n, m] = input.shift().split(" ").map(Number);
    if (n === 0 && m === 0) break;
    const edges = input.splice(0, m).map((line) => line.split(" ").map(Number));
    const treeCount = solution(n, m, edges);
    if (treeCount > 1) {
      console.log(`Case ${i}: A forest of ${treeCount} trees.`);
    } else if (treeCount === 1) {
      console.log(`Case ${i}: There is one tree.`);
    } else {
      console.log(`Case ${i}: No trees.`);
    }
    i += 1;
  }
});

function findParent(parent, n) {
  if (parent[n] === n) return n;
  return (parent[n] = findParent(parent, parent[n]));
}
function unionParent(parent, a, b, cycled) {
  a = findParent(parent, a);
  b = findParent(parent, b);
  if (a === b) cycled.push(a);
  if (a < b) parent[b] = a;
  else parent[a] = b;
}

const solution = (n, m, edges) => {
  const parent = Array.from(Array(n + 1), (_, i) => i);
  const cycled = [];
  for (const [a, b] of edges) {
    unionParent(parent, a, b, cycled);
  }

  const parentSet = new Set();
  for (let i = 1; i < n + 1; i += 1) {
    const x = findParent(parent, i);
    parentSet.add(x);
  }
  const cycledSet = new Set();
  for (const x of cycled) {
    const k = findParent(parent, x);
    cycledSet.add(k);
  }
  return [...parentSet].length - [...cycledSet].length;
};
