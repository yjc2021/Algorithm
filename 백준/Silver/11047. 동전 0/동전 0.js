const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const coins = input.slice(1, 1 + n).map(Number);

console.log(solution(n, k, coins));

function solution(n, k, coins) {
  let cnt = 0;
  for (let i = n - 1; i >= 0; i -= 1) {
    const t = Math.floor(k / coins[i]);
    if (t === 0) continue;

    cnt += t;
    k %= coins[i];
  }
  return cnt;
}
