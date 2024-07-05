const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const towers = input[1].split(" ").map(Number);

console.log(solution(n, towers));

function solution(n, towers) {
  const ans = [];
  const stack = [];
  towers.forEach((tower, idx) => {
    while (stack.length) {
      const [index, height] = stack[stack.length - 1];
      if (height > tower) {
        ans.push(index);
        break;
      }
      stack.pop();
    }
    if (stack.length === 0) ans.push(0);
    stack.push([idx + 1, tower]);
  });
  return ans.join(" ");
}
