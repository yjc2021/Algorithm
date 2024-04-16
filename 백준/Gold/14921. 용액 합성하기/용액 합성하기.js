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
  const liquids = input[1].split(" ").map(Number);
  console.log(solution(n, liquids));
});

const solution = (n, liquids) => {
  let left = 0;
  let right = n - 1;
  let ans = Infinity;
  while (left < right) {
    const temp = liquids[left] + liquids[right];
    if (temp < 0) {
      left += 1;
    } else if (temp > 0) {
      right -= 1;
    } else {
      ans = 0;
      break;
    }

    if (Math.abs(temp) < Math.abs(ans)) {
      ans = temp;
    }
  }
  return ans;
};
