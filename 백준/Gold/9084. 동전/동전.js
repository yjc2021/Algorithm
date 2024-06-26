const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

let t = +input[0];

let idx = 1;
const answer = [];
while (t--) {
  const n = +input[idx];
  const coins = input[idx + 1].split(" ").map(Number);
  const m = +input[idx + 2];
  answer.push(solution(n, coins, m));
  idx += 3;
}
console.log(answer.join("\n"));

function solution(n, coins, m) {
  const dp = Array(m + 1).fill(0);

  dp[0] = 1;
  for (let i = 0; i < n; i += 1) {
    for (let j = coins[i]; j <= m; j += 1) {
      dp[j] += dp[j - coins[i]];
    }
  }

  return dp[m];
}
