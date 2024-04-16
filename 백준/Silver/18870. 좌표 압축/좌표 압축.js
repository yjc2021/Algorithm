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
  const x = input[1].split(" ").map(Number);
  console.log(solution(n, x));
});

const solution = (n, x) => {
  const uniq = [...new Set(x)].sort((a, b) => a - b);
  const dic = {};
  uniq.forEach((e, index) => {
    dic[e] = index;
  });
  const compressed = x.map((e) => dic[e]);
  return compressed.join(" ");
};
