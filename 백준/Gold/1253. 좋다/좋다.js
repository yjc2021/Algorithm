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
  const numbers = input[0].split(" ").map(Number);
  console.log(solution(n, numbers));
});

const solution = (n, numbers) => {
  numbers.sort((a, b) => a - b);
  let cnt = 0;
  for (let i = 0; i < n; i += 1) {
    let left = 0,
      right = n - 1;
    const key = numbers[i];

    while (left < right) {
      if (left === i) left += 1;
      else if (right === i) right -= 1;
      else if (key > numbers[left] + numbers[right]) left += 1;
      else if (key === numbers[left] + numbers[right]) {
        cnt += 1;
        break;
      } else right -= 1;
    }
  }
  return cnt;
};
