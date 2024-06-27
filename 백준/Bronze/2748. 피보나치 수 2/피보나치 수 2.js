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

  d[0] = 0;
  d[1] = 1;

  for (let i = 2; i <= n; i += 1) {
    d[i] = BigInt(d[i - 2]) + BigInt(d[i - 1]);
  }

  return d[n].toString();
}
