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
  const eggs = [];
  input.forEach((line) => {
    eggs.push(line.split(" ").map(Number));
  });
  console.log(solution(n, eggs));
});

const solution = (n, eggs) => {
  let ans = 0;
  const dfs = (e) => {
    if (e === n) {
      let broken = 0;
      for (let i = 0; i < n; i += 1) {
        if (eggs[i][0] <= 0) broken += 1;
      }
      ans = Math.max(ans, broken);
      return;
    }
    const [eHp, eWeight] = eggs[e];

    let flag = true;
    for (let i = 0; i < n; i += 1) {
      const [iHp, iWeight] = eggs[i];
      if (iHp <= 0 || eHp <= 0) continue;
      if (i === e) continue;

      flag = false;
      eggs[e][0] -= iWeight;
      eggs[i][0] -= eWeight;
      dfs(e + 1);
      eggs[e][0] += iWeight;
      eggs[i][0] += eWeight;
    }
    if (flag) dfs(e + 1);
  };
  dfs(0);
  return ans;
};
