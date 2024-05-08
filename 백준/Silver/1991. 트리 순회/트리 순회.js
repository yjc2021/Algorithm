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
  const tree = {};

  input.forEach((line) => {
    const [node, left, right] = line.split(" ");
    tree[node] = [left, right];
  });
  console.log(solution(n, tree));
});

const solution = (n, tree) => {
  let ans = "";
  function preOrder(node) {
    if (node === ".") return;
    const [left, right] = tree[node];
    ans += node;
    preOrder(left);
    preOrder(right);
  }
  function inOrder(node) {
    if (node === ".") return;
    const [left, right] = tree[node];
    inOrder(left);
    ans += node;
    inOrder(right);
  }
  function postOrder(node) {
    if (node === ".") return;
    const [left, right] = tree[node];
    postOrder(left);
    postOrder(right);
    ans += node;
  }

  preOrder("A");
  ans += "\n";
  inOrder("A");
  ans += "\n";
  postOrder("A");
  ans += "\n";

  return ans;
};
