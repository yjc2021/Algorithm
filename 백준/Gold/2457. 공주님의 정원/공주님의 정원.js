const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const bloomSpan = input
  .slice(1, 1 + n)
  .map((line) => line.split(" ").map(Number));

console.log(solution(n, bloomSpan));

function solution(n, bloomSpan) {
  let cnt = 0;
  let m = 3;
  let d = 1;
  let index = -1;
  let endMonth = 0;
  let endDay = 0;

  const visited = Array(n).fill(false);

  while (true) {
    for (let i = 0; i < n; i += 1) {
      if (visited[i]) continue;
      if (
        bloomSpan[i][0] < m ||
        (bloomSpan[i][0] === m && bloomSpan[i][1] <= d)
      ) {
        if (
          bloomSpan[i][2] > endMonth ||
          (bloomSpan[i][2] === endMonth && bloomSpan[i][3] > endDay)
        ) {
          index = i;
          endMonth = bloomSpan[i][2];
          endDay = bloomSpan[i][3];
        }
      }
    }
    if (index === -1) {
      return 0;
    }
    m = bloomSpan[index][2];
    if (m === 12) {
      return cnt + 1;
    }
    d = bloomSpan[index][3];
    visited[index] = true;
    cnt += 1;
    endMonth = 0;
    endDay = 0;
    index = -1;
  }
}