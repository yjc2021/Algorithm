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
  const t = Number(input.shift());
  const n = Number(input.shift());
  const a = input.shift().split(" ").map(Number);
  const m = Number(input.shift());
  const b = input.shift().split(" ").map(Number);

  for (let i = 1; i < n; i += 1) {
    a[i] += a[i - 1];
  }
  for (let i = 1; i < m; i += 1) {
    b[i] += b[i - 1];
  }
  console.log(solution(t, n, m, a, b));
});

const solution = (t, n, m, a, b) => {
  const aSum = [];
  const bSum = [];
  for (let i = 0; i < n; i += 1) {
    for (let j = i; j < n; j += 1) {
      let temp = a[j];
      if (i > 0) temp -= a[i - 1];
      aSum.push(temp);
    }
  }
  for (let i = 0; i < m; i += 1) {
    for (let j = i; j < m; j += 1) {
      let temp = b[j];
      if (i > 0) temp -= b[i - 1];
      bSum.push(temp);
    }
  }
  aSum.sort((a, b) => a - b);
  bSum.sort((a, b) => a - b);
  const aSize = Math.floor((n * (n + 1)) / 2);
  const bSize = Math.floor((m * (m + 1)) / 2);
  let left = 0;
  let right = bSize - 1;
  let ans = 0;
  while (left < aSize && right > -1) {
    const sum = aSum[left] + bSum[right];
    let aTarget = aSum[left];
    let bTarget = bSum[right];
    if (sum === t) {
      let aCnt = 0,
        bCnt = 0;
      while (left < aSize && aSum[left] === aTarget) {
        left += 1;
        aCnt += 1;
      }
      while (right > -1 && bSum[right] === bTarget) {
        right -= 1;
        bCnt += 1;
      }
      ans += aCnt * bCnt;
    } else if (sum > t) right -= 1;
    else left += 1;
  }
  return ans;
};
