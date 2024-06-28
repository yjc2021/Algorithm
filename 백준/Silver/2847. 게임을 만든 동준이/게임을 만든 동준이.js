const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const levelPoints = input.slice(1, 1 + n).map(Number);

console.log(solution(n, levelPoints));

function solution(n, levelPoints) {
  let ans = 0;
  for (let i = n - 1; i >= 1; i -= 1) {
    if (levelPoints[i] <= levelPoints[i - 1]) {
      ans += levelPoints[i - 1] - levelPoints[i] + 1;
      levelPoints[i - 1] = levelPoints[i] - 1;
    }
  }
  return ans;
}
