const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const pw = input[0].split("").map(Number);

console.log(solution(pw));

function solution(pw) {
  const n = pw.length;
  const dp = Array(n + 1).fill(0);
  if (pw[0] === 0) return 0;
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i <= n; i += 1) {
    if (pw[i - 1] !== 0) {
      dp[i] = (dp[i - 1] + dp[i]) % 1000000;
    }

    if (pw[i - 2] * 10 + pw[i - 1] <= 26 && pw[i - 2] !== 0) {
      dp[i] = (dp[i] + dp[i - 2]) % 1000000;
    }
  }
  return dp[n];
}
