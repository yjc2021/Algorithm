const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const meetings = input
  .slice(1, 1 + n)
  .map((line) => line.split(" ").map(Number));

console.log(solution(n, meetings));

function solution(n, meetings) {
  meetings.sort((a, b) => (a[1] - b[1] === 0 ? a[0] - b[0] : a[1] - b[1]));
  let cur = 0;
  let cnt = 0;
  for (let i = 0; i < n; i += 1) {
    if (meetings[i][0] >= cur) {
      cnt += 1;
      cur = meetings[i][1];
    }
  }
  return cnt;
}
