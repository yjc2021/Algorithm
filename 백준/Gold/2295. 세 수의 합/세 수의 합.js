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
  const n = Number(input.shift());
  const u = input.map(Number);
  console.log(solution(n, u));
});

const solution = (n, u) => {
  u.sort((a, b) => a - b);
  let sum = [];

  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      sum.push(u[i] + u[j]);
    }
  }

  sum.sort((a, b) => a - b);
  sum = [...new Set(sum)];
  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = n - 1; j >= 0; j -= 1) {
      const dif = u[i] - u[j];
      if (binSearch(sum, dif)) {
        return u[i];
      }
    }
  }
};

const binSearch = (arr, target) => {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return true;
    }
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
};
