const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const a = input[1].split(" ").map(Number);

console.log(solution(n, m, a));

function solution(n, m, a) {
  let s = 0,
    e = 0;
  let sum = 0;
  let cnt = 0;

  while (e <= n) {
    if (sum >= m) {
      sum -= a[s++];
    } else if (sum < m) {
      sum += a[e++];
    }
    if (sum === m) cnt += 1;
  }
  return cnt;
}
