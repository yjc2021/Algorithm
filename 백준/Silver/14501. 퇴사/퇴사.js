const fs = require("fs");
const input = fs.readFileSync(0,"utf-8").toString().trim().split("\n");

const n = +input[0];
const table = input.slice(1).map((line) => line.split(" ").map(Number));

function solution(n, table) {
  const dp = Array(n).fill(0);

  for (let i = 0; i < n; i += 1) {
    const [t, p] = table[i];
    if (i + t > n) continue;
    dp[i] += p;

    for (let j = i + t; j < n; j += 1) {
      dp[j] = Math.max(dp[j], dp[i]);
    }
  }
  return Math.max(...dp);
}

console.log(solution(n, table));
