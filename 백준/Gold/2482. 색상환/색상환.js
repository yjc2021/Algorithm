const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const k = +input[1];
const mod = 1000000003;

console.log(solution(n, k));

function solution(n, k) {
  const d = Array.from(Array(n + 1), () => Array(k + 1).fill(0));

  for (let i = 0; i <= n; i += 1) {
    d[i][1] = i;
    d[i][0] = 1;
  }

  for (let i = 2; i <= n; i += 1) {
    for (let j = 2; j <= k; j += 1) {
      d[i][j] = (d[i - 2][j - 1] + d[i - 1][j]) % mod;
    }
  }

  return (d[n - 1][k] + d[n - 3][k - 1]) % mod;
}

