const { time } = require("console");

const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const [t, w] = input[0].split(" ").map(Number);
const whichTree = input.slice(1).map(Number);

function solution(t, w, whichTree) {
  const dp = Array.from(Array(3), () =>
    Array.from(Array(t + 1), () => Array(w + 2).fill(0))
  );

  for (let i = 1; i <= t; i += 1) {
    for (let j = 1; j <= w + 1; j += 1) {
      if (whichTree[i - 1] === 1) {
        dp[1][i][j] = Math.max(dp[1][i - 1][j], dp[2][i - 1][j - 1]) + 1;
        dp[2][i][j] = Math.max(dp[1][i - 1][j - 1], dp[2][i - 1][j]);
      } else if (whichTree[i - 1] === 2) {
        if (i === 1 && j === 1) continue;
        dp[1][i][j] = Math.max(dp[1][i - 1][j], dp[2][i - 1][j - 1]);
        dp[2][i][j] = Math.max(dp[1][i - 1][j - 1], dp[2][i - 1][j]) + 1;
      }
    }
  }

  let max = 0;
  for (let i = 1; i <= w + 1; i += 1) {
    max = Math.max(max, Math.max(dp[1][t][i], dp[2][t][i]));
  }
  return max;
}
console.log(solution(t, w, whichTree));
