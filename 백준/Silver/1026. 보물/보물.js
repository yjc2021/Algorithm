const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const a = input[1].split(" ").map(Number);
const b = input[2].split(" ").map(Number);

console.log(solution(n, a, b));

function solution(n, a, b) {
  b.sort((a, b) => b - a);

  a.sort((a, b) => a - b);

  let ans = 0;
  for (let i = 0; i < n; i += 1) {
    ans += a[i] * b[i];
  }
  return ans;
}
