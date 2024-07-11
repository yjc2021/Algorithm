const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const sections = input
  .slice(1, 1 + n)
  .map((line) => line.split(" ").map(Number));

console.log(solution(n, k, sections));

function solution(n, k, sections) {
  let s = 0,
    e = 0;
  let sum = 0;
  const arr = Array(1000001).fill(0);
  for (let i = 0; i < n; i += 1) {
    let [s, e] = sections[i];
    while (s < e) {
      arr[s++] += 1;
    }
  }
  while (s <= e && e <= 1000000) {
    if (sum === k) {
      return [s, e].join(" ");
    } else if (sum < k) {
      sum += arr[e++];
    } else {
      sum -= arr[s++];
    }
  }
  return "0 0";
}