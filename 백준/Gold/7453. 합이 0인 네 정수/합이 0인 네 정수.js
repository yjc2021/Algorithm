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
  const a = [],
    b = [],
    c = [],
    d = [];
  input.forEach((line) => {
    line.split(" ").forEach((m, idx) => {
      m = Number(m);
      switch (idx) {
        case 0:
          a.push(m);
          break;
        case 1:
          b.push(m);
          break;
        case 2:
          c.push(m);
          break;
        case 3:
          d.push(m);
          break;
      }
    });
  });

  console.log(solution(n, a, b, c, d));
});

const solution = (n, a, b, c, d) => {
  const ab = new Map();
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const abSum = a[i] + b[j];
      const cdSum = c[i] + d[j];
      if (ab.has(abSum)) {
        ab.set(abSum, ab.get(abSum) + 1);
      } else ab.set(abSum, 1);
    }
  }

  let ans = 0;
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      ans += ab.get((c[i] + d[j]) * -1) ? ab.get((c[i] + d[j]) * -1) : 0;
    }
  }

  return ans;
};
