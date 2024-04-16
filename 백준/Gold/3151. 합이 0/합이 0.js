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
  const n = Number(input[0]);
  const a = input[1].split(" ").map(Number);
  console.log(solution(n, a));
});

const solution = (n, a) => {
  a.sort((a, b) => a - b);
  if (a[0] > 0) return 0;
  let ans = 0;
  for (let i = 0; i < n; i += 1) {
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
      let l = 1;
      let r = 1;
      const sum = a[i] + a[left] + a[right];
      if (sum === 0) {
        if (a[left] === a[right]) {
          let t = right - left + 1;
          ans += (t * (t - 1)) / 2;
          break;
        }

        while (left + 1 < right && a[left] === a[left + 1]) {
          l += 1;
          left += 1;
        }
        while (right - 1 > left && a[right] === a[right - 1]) {
          r += 1;
          right -= 1;
        }
        ans += l * r;
      }
      if (sum > 0) {
        right -= 1;
      } else {
        left += 1;
      }
    }
  }
  return ans;
};