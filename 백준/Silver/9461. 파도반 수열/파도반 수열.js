const fs = require("fs");
const input = fs.readFileSync(0,"utf-8").toString().trim().split("\n");

const dp = Array(101).fill(0);
const answer = [];
dp[1] = 1;
dp[2] = 1;
dp[3] = 1;

const t = +input[0];
solution();

for (let i = 1; i <= t; i += 1) {
  const n = +input[i];
  answer.push(dp[n]);
}
console.log(answer.join("\n"));

function solution() {
  for (let i = 4; i <= 100; i += 1) {
    dp[i] = dp[i - 3] + dp[i - 2];
  }
}
