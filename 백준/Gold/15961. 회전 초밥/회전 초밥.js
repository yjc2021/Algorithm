const fs = require("node:fs");
const readline = require("readline");
const dest = process.execArgv.includes("--stack-size=65536")
  ? process.stdin
  : fs.createReadStream("input.txt", "utf-8");
const rl = readline.createInterface({
  input: dest,
  output: process.stdout,
});
const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [n, d, k, c] = input.shift().split(" ").map(Number);
  const sushi = input.map(Number);
  console.log(solution(n, d, k, c, sushi));
});

const solution = (n, d, k, c, sushi) => {
  const visited = {};
  let res = 1;
  visited[c] = 1;

  for (let i = 0; i < k; i += 1) {
    if (!visited[sushi[i]]) {
      visited[sushi[i]] = 0;
      res += 1;
    }
    visited[sushi[i]] += 1;
  }

  let cnt = res;

  for (let i = 1; i < n; i += 1) {
    visited[sushi[i - 1]] -= 1;
    if (visited[sushi[i - 1]] === 0) cnt -= 1;

    if (!visited[sushi[(i + k - 1) % n]]) {
      visited[sushi[(i + k - 1) % n]] = 0;
      cnt += 1;
    }
    visited[sushi[(i + k - 1) % n]] += 1;

    res = Math.max(res, cnt);
  }

  return res;
};
