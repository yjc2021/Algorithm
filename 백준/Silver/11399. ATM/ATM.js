const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const cost = input[1].split(" ").map(Number);

console.log(solution(n, cost));

function solution(n, cost) {
  return cost
    .sort((a, b) => a - b)
    .reduce((acc, cur, idx) => acc + cur * (n - idx), 0);
}
