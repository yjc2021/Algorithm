const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const n = +input[0];
const m = +input[1];
const vip = input.slice(2).map(Number);

function solution(n, m, vip) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i += 1) dp[i] = dp[i - 1] + dp[i - 2];

  let ans = 1;
  let prev = 0;

  for (const seat of vip) {
    ans *= dp[seat - prev - 1];
    prev = seat;
  }
  ans *= dp[n - prev];

  return ans;
}

console.log(solution(n, m, vip));
