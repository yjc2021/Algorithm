const dest = process.execArgv.includes("--stack-size=65536")
  ? "/dev/stdin"
  : "input.txt";

const input = require("fs").readFileSync(dest, "utf-8").split("\n");
const n = Number(input[0]);
const a = input[1].split(" ").map(Number);
const m = Number(input[2]);
const questions = input.slice(3).map((v, i) => v.split(" ").map(Number));
const dp = Array.from(Array(n + 1), () => Array(n + 1).fill(0));

// dp[i-1][j+1] = dp[i][j] && a[i-1] === a[j+1]

// dp[i][i] = 1;
// dp[i][i+1] = 0;

for (let i = 0; i < n; i += 1) {
  dp[i][i] = 1;
  if (i < n - 1 && a[i] === a[i + 1]) dp[i][i + 1] = 1;
}
// for (let i = 0; i < n; i += 1) {
//   for (let j = i + 2; j < n; j += 1) {
//     dp[i][j] = Number(dp[i + 1][j - 1] && a[i] === a[j]);
//   }
// }
for (let size = 3; size <= n; size += 1) {
  for (let s = 0; s + size - 1 < n; s += 1) {
    const e = s + size - 1;
    dp[s][e] = Number(dp[s + 1][e - 1] && a[s] === a[e]);
  }
}

// [0][1]        [0][1][2]
// [0][1][2][3]  [0][1][2][3][4]
const answer = [];
for (let i = 0; i < m; i += 1) {
  const [s, e] = questions[i];
  answer.push(dp[s - 1][e - 1]);
}
console.log(answer.join("\n"));
