const dest = process.execArgv.includes("--stack-size=65536")
  ? "/dev/stdin"
  : "input.txt";

const input = require("fs").readFileSync(dest, "utf-8").split("\n");

const s1 = input[0];
const s2 = input[1];

const len1 = s1.length;
const len2 = s2.length;

const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0));

for (let i = 1; i <= len1; i += 1) {
  for (let j = 1; j <= len2; j += 1) {
    if (s1[i - 1] === s2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

console.log(dp[len1][len2]);
