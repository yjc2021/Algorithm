const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const ability = input
  .slice(1, 1 + n)
  .map((line) => line.split(" ").map(Number));

console.log(solution(n, m, ability));

function solution(n, m, ability) {
  ability.forEach((item) => item.sort((a, b) => a - b));

  const arr = Array(n).fill(0);
  let minArr = 0;
  let ans = Infinity;
  while (true) {
    let max = 0;
    let min = Infinity;
    for (let i = 0; i < n; i += 1) {
      if (ability[i][arr[i]] > max) max = ability[i][arr[i]];
      if (ability[i][arr[i]] < min) {
        min = ability[i][arr[i]];
        minArr = i;
      }
    }
    ans = Math.min(ans, max - min);
    arr[minArr] += 1;
    if (arr[minArr] === m) break;
  }
  return ans;
}
