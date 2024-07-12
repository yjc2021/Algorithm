const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const [m, n] = input[0].split(" ").map(Number);
const candies = input[1].split(" ").map(Number);

console.log(solution(m, n, candies));

function solution(...args) {
  const [m, n, candies] = args;
  candies.sort((a, b) => a - b);
  let left = 1;
  let right = candies.at(-1);
  let ans = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const cnt = candies.reduce((acc, cur) => acc + Math.floor(cur / mid), 0);

    if (cnt >= m) {
      left = mid + 1;
      ans = mid;
    } else {
      right = mid - 1;
    }
  }
  return ans;
}
