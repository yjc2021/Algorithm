const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const n = +input[0];

function solution(n) {
  const dp = new Array(n + 1).fill(0);

  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i += 1) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 15746;
  }
  return dp[n];
}

console.log(solution(n));
