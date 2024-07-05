const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const buildings = input.slice(1, 1 + n).map(Number);

console.log(solution(n, buildings));

function solution(n, buildings) {
  const stack = [];
  let ans = 0;
  buildings.forEach((h) => {
    while (stack.length && stack.at(-1) <= h) stack.pop();
    stack.push(h);

    ans += stack.length - 1;
  });

  return ans;
}
