const fs = require("fs");
const input = fs.readFileSync(0,"utf-8").toString().trim().split("\n");

const n = +input[0];
const stairs = input.slice(1).map(Number);
const dp = Array(n + 1).fill(0);

dp[1] = stairs[0];
dp[2] = stairs[0] + stairs[1];
dp[3] = Math.max(stairs[0], stairs[1]) + stairs[2];

for (let i = 4; i <= n; i += 1) {
  dp[i] = Math.max(
    dp[i - 3] + stairs[i - 2] + stairs[i - 1],
    dp[i - 2] + stairs[i - 1]
  );
}
console.log(dp[n]);
