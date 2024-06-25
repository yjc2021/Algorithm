const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const n = +input[0];
const table = input.slice(1).map((line) => line.split(" ").map(Number));

function solution(n, table) {
  const dp = Array(n + 1).fill(0);
  let max = 0;

  for (let i = 0; i < n; i += 1) {
    max = Math.max(max, dp[i]);
    const [t, p] = table[i];

    if (i + t <= n) dp[i + t] = Math.max(dp[i + t], max + p);
  }

  return Math.max(...dp);
}

console.log(solution(n, table));
