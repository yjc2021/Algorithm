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
  let s = (e = 0);
  let max = 0;
  let oddCnt = 0;

  if (a[0] % 2) oddCnt += 1;
  while (e <= n && s <= e) {
    if (oddCnt <= k) {
      e += 1;
      if (e >= n) continue;
      if (a[e] % 2) {
        oddCnt += 1;
      }
    } else {
      max = Math.max(max, e - s - k);
      while (oddCnt > k) {
        if (s === n) break;
        if (a[s++] % 2) oddCnt -= 1;
      }
    }
  }
  if (oddCnt === 0) {
    max = Math.max(max, e - s - 1);
  } else {
    max = Math.max(max, e - s - 1 - oddCnt);
  }

  return max;
}
