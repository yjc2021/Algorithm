const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const arr = input
  .slice(1, 1 + n)
  .map((line) => line.trim().split("").map(Number));

console.log(solution(n, m, arr));

function solution(n, m, arr) {
  const dp = arr.map((x) => [...x]);

  for (let i = 1; i < n; i += 1) {
    for (let j = 1; j < m; j += 1) {
      if (arr[i][j]) {
        dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j - 1], dp[i - 1][j]) + 1;
      }
    }
  }

  let ans = 0;

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < m; j += 1) {
      ans = Math.max(ans, dp[i][j]);
    }
  }

  return ans ** 2;
}
