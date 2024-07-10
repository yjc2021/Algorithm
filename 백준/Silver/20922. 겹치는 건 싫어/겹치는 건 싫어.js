const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const a = input[1].split(" ").map(Number);

console.log(solution(n, k, a));

function solution(n, k, a) {
  const map = {};
  let max = 0;
  let i = 0,
    j = 0;
  while (i <= j && j < n) {
    while (map[a[j]] === k) {
      map[a[i]] -= 1;
      i += 1;
    }
    max = Math.max(max, j - i + 1);
    map[a[j]] = (map[a[j]] ?? 0) + 1;
    j += 1;
  }
  return max;
}
