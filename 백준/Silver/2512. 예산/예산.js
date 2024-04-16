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
  const budgets = input[1].split(" ").map(Number);
  const total = Number(input[2]);
  console.log(solution(n, budgets, total));
});

const solution = (n, budgets, total) => {
  budgets.sort((a, b) => a - b);

  let left = 0;
  let right = budgets.at(-1);
  let ans = 0;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const temp = tryBudget(budgets, mid);
    // console.log(mid, temp);
    if (total >= temp) {
      left = mid + 1;
      if (mid > ans) ans = mid;
    } else {
      right = mid - 1;
    }
  }

  return ans;
};

const tryBudget = (budgets, max) => {
  const temp = budgets.reduce((acc, cur) => {
    if (cur > max) return acc + max;
    return acc + cur;
  }, 0);
  return temp;
};
