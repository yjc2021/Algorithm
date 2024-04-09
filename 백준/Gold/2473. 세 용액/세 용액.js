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
  const liquids = input[0]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);

  console.log(solution(n, liquids));
});

const solution = (n, liquids) => {
  let min = Infinity;
  const ans = Array(3).fill(0);

  for (let i = 0; i < n - 2; i += 1) {
    let left = i + 1;
    let right = n - 1;
    while (left < right) {
      const sum = liquids[left] + liquids[right] + liquids[i];
      if (Math.abs(sum) < min) {
        ans[0] = liquids[i];
        ans[1] = liquids[left];
        ans[2] = liquids[right];
        min = Math.abs(sum);
      }
      if (sum < 0) left += 1;
      else right -= 1;
    }
  }
  return ans.join(" ");
};
