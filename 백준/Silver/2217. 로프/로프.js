const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const ropes = input.slice(1, 1 + n).map(Number);

console.log(solution(n, ropes));

function solution(n, ropes) {
  ropes.sort((a, b) => b - a);

  let max = ropes[0];
  for (let i = 1; i < n; i += 1) {
    const current = ropes[i] * (i + 1);
    max = current > max ? current : max;
  }

  return max;
}
