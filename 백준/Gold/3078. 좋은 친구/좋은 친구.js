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
  const [n, k] = input.shift().split(" ").map(Number);
  const students = input.map((line) => line.trim().length);
  console.log(solution(n, k, students));
});

const solution = (n, k, students) => {
  let cnt = 0;
  const dict = {};

  for (let i = 0; i < n; i += 1) {
    if (i > k) {
      dict[students[i - k - 1]] -= 1;
    }
    if (!dict[students[i]]) dict[students[i]] = 0;
    cnt += dict[students[i]];
    dict[students[i]] += 1;
  }
  return cnt;
};
