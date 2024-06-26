const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const n = +input[0];

function solution(n) {
  const absN = Math.abs(n);
  const p = new Array(absN + 1).fill(0);
  const d = new Array(absN + 1).fill(0);

  p[0] = 0;
  p[1] = 1;
  d[0] = 0;
  d[1] = 1;

  for (let i = 2; i <= absN; i += 1) {
    p[i] = (p[i - 2] - p[i - 1]) % 1000000000;
    d[i] = (d[i - 1] + d[i - 2]) % 1000000000;
  }

  const ans = [];
  if (n === 0) {
    ans.push(0);
    ans.push(0);
  } else if (n > 0) {
    ans.push(1);
    ans.push(d[n]);
  } else {
    if (p[absN] > 0) ans.push(1);
    else if (p[absN] < 0) ans.push(-1);
    else ans.push(0);
    ans.push(Math.abs(p[absN]));
  }
  return ans.join("\n");
}

console.log(solution(n));
