const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];

console.log(solution(n));

function solution(n) {
  const d = Array(n + 1).fill(0);

  d[1] = 1;
  d[3] = 1;
  d[4] = 1;

  for (let i = 5; i <= n; i += 1) {
    if (!d[i - 1] || !d[i - 3] || !d[i - 4]) d[i] = 1;
  }
  return !d[n] ? "CY" : "SK";
}
