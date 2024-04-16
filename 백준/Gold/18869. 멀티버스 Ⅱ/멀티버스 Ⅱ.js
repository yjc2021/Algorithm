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
  const [m, n] = input.shift().split(" ").map(Number);
  const universes = Array.from(Array(m), () => []);
  input.forEach((line, idx) => {
    line
      .split(" ")
      .map(Number)
      .forEach((num) => {
        universes[idx].push(num);
      });
  });

  console.log(solution(m, n, universes));
});

const solution = (m, n, universes) => {
  const compressed = universes.map((universe) => compress(universe));
  let ans = 0;
  for (let i = 0; i < m; i += 1) {
    for (let j = i + 1; j < m; j += 1) {
      let flag = true;
      for (let k = 0; k < compressed[i].length; k += 1) {
        if (compressed[i][k] !== compressed[j][k]) flag = false;
      }
      if (flag) ans += 1;
    }
  }
  return ans;
};

const compress = (arr) => {
  const dic = {};
  const uniq = [...new Set(arr)].sort((a, b) => a - b);
  uniq.forEach((e, index) => {
    dic[e] = index;
  });
  return arr.map((e) => dic[e]);
};
