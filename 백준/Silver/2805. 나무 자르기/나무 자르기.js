const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const trees = input[1].split(" ").map(Number);

console.log(solution(n, m, trees));

function solution(n, m, trees) {
  let left = 1;
  let right = Math.max(...trees);
  let ans = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const sum = trees.reduce(
      (acc, cur) => (cur - mid <= 0 ? acc : acc + cur - mid),
      0
    );
    if (sum < m) {
      right = mid - 1;
    } else {
      left = mid + 1;
      ans = Math.max(ans, mid);
    }
  }
  return ans;
}
