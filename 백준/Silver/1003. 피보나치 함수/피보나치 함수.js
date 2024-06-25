const fs = require("fs");
const input = fs.readFileSync(0,"utf-8").toString().trim().split("\n");

const t = +input[0];
const answer = [];

const dp0 = Array(41).fill(-1);
const dp1 = Array(41).fill(-1);

dp0[0] = 1;
dp0[1] = 0;
dp1[0] = 0;
dp1[1] = 1;

for (let i = 1; i <= t; i += 1) {
  const n = +input[i];
  answer.push(solution(n));
}
console.log(answer.join("\n"));

function solution(n) {
  for (let i = 2; i <= n; i += 1) {
    if (dp0[i] >= 0) continue;
    dp0[i] = dp0[i - 1] + dp0[i - 2];
  }
  for (let i = 2; i <= n; i += 1) {
    if (dp1[i] >= 0) continue;
    dp1[i] = dp1[i - 1] + dp1[i - 2];
  }

  return `${dp0[n]} ${dp1[n]}`;
}
