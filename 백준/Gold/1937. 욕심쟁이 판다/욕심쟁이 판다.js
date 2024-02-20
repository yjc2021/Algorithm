const dest = process.execArgv.includes("--stack-size=65536")
  ? "/dev/stdin"
  : "input.txt";

const input = require("fs").readFileSync(dest, "utf-8").split("\n");

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const n = Number(input[0]);
const bamboo = input.slice(1).map((v, i) => v.split(" ").map(Number));
const dp = Array.from(Array(n + 1), () => Array(n + 1).fill(-1));

const dfs = (x, y) => {
  if (dp[x][y] === -1) {
    dp[x][y] = 0;
    for (let i = 0; i < 4; i += 1) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (0 <= nx && 0 <= ny && nx < n && ny < n) {
        if (bamboo[nx][ny] > bamboo[x][y]) {
          dp[x][y] = Math.max(dp[x][y], dfs(nx, ny));
        }
      }
    }
  }
  return dp[x][y] + 1;
};

let ans = 1;
for (let i = 0; i < n; i += 1) {
  for (let j = 0; j < n; j += 1) {
    ans = Math.max(ans, dfs(i, j));
  }
}

console.log(ans);
