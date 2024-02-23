const dest = process.execArgv.includes("--stack-size=65536")
  ? "/dev/stdin"
  : "input.txt";

const input = require("fs").readFileSync(dest, "utf-8").trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);
const coins = input.slice(1).map(Number);

const dp = Array(k + 1).fill(Infinity);
dp[0] = 0;

for (let i = 0; i < n; i += 1) {
  for (let j = coins[i]; j <= k; j += 1) {
    dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
  }
}

console.log(dp[k] === Infinity ? -1 : dp[k]);
