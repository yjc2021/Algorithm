const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const children = input[1].split(" ").map(Number);

console.log(solution(n, children));

function solution(n, children) {
  const lcs = Array(n + 1).fill(0);
  let max = 0;
  for (let i = 1; i <= n; i += 1) {
    const num = children[i - 1];
    lcs[num] = lcs[num - 1] + 1;
    max = Math.max(max, lcs[num]);
  }
  return n - max;
}
