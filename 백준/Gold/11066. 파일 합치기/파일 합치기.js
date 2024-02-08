const dest = process.execArgv.includes("--stack-size=65536")
  ? "/dev/stdin"
  : "input.txt";

const input = require("fs").readFileSync(dest, "utf-8").split("\n");

let t = Number(input[0]);
let counter = 1;

const answer = [];
while (t) {
  const k = Number(input[counter]);
  counter += 1;
  const pages = input[counter].split(" ").map(Number);
  counter += 1;

  answer.push(getMinimumCost(k, pages));
  t -= 1;
}
console.log(answer.join("\n"));

function getMinimumCost(k, pages) {
  const dp = Array.from(Array(k + 1), () => new Array(k + 1).fill(0));
  const sum = new Array(k).fill(0);

  sum[0] = pages[0];
  for (let i = 1; i < k; i += 1) {
    sum[i] = sum[i - 1] + pages[i];
  }
  for (let i = 0; i < k; i += 1) {
    dp[i][i + 1] = pages[i] + pages[i + 1];
  }

  for (let size = 2; size < k; size += 1) {
    for (let start = 0; start < k - size; start += 1) {
      const end = start + size;

      let result = Infinity;
      for (let pivot = start; pivot < end; pivot += 1) {
        const sum_dif = start !== 0 ? sum[end] - sum[start - 1] : sum[end];
        result = Math.min(
          result,
          dp[start][pivot] + dp[pivot + 1][end] + sum_dif
        );
      }
      dp[start][end] = result;
    }
  }
  return dp[0][k - 1];
}
