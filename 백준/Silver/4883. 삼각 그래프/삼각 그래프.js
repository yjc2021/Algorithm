const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

let index = 0;
let t = 1;
while (true) {
  const n = +input[index];

  if (n === 0) {
    break;
  }

  const nodes = input
    .slice(index + 1, index + 1 + n)
    .map((line) => line.split(" ").map(Number));

  console.log(solution(t, n, nodes));
  index += n + 1;
  t += 1;
}

function solution(t, n, nodes) {
  const dp = Array.from(Array(n), () => Array(3).fill(Infinity));
  dp[0][1] = nodes[0][1];
  dp[0][2] = dp[0][1] + nodes[0][2];

  for (let i = 1; i < n; i += 1) {
    dp[i][0] = nodes[i][0] + Math.min(dp[i - 1][0], dp[i - 1][1]);
    dp[i][1] =
      nodes[i][1] +
      Math.min(dp[i - 1][0], dp[i - 1][1], dp[i - 1][2], dp[i][0]);
    dp[i][2] = nodes[i][2] + Math.min(dp[i - 1][1], dp[i - 1][2], dp[i][1]);
  }

  return `${t}. ${dp[n - 1][1]}`;
}
