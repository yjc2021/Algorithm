const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const a = input[1].split(" ").map(Number);

console.log(solution(n, a));

function solution(n, a) {
  const stack = [];
  const ans = Array(n).fill(-1);
  a.forEach((item, idx) => {
    while (stack.length && stack.at(-1)[0] < item) {
      ans[stack.pop()[1]] = item;
    }
    stack.push([item, idx]);
  });
  return ans.join(" ");
}
