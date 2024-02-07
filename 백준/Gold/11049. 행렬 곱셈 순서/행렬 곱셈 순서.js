const dest = process.execArgv.includes("--stack-size=65536")
  ? "/dev/stdin"
  : "input.txt";

const input = require("fs").readFileSync(dest, "utf-8").split("\n");

const n = Number(input.splice(0, 1));

const matrix = input.map((entry) => entry.split(" ").map(Number));

const dp = Array.from(Array(n + 1), () => new Array(n + 1).fill(0));

for (let size = 1; size < n; size += 1) {
  for (let start = 0; start < n - size; start += 1) {
    const end = start + size;

    let result = Infinity;
    for (let pivot = start; pivot < end; pivot += 1) {
      result = Math.min(
        result,
        dp[start][pivot] +
          dp[pivot + 1][end] +
          matrix[start][0] * matrix[pivot][1] * matrix[end][1]
      );
    }
    dp[start][end] = result;
  }
}
console.log(dp[0][n - 1]);
