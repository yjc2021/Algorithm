const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const k = +input[0];
const numbers = input.slice(1, 1 + k).map(Number);

console.log(solution(k, numbers));

function solution(k, numbers) {
  const stack = [];

  numbers.forEach((number) => {
    if (number === 0) {
      stack.pop();
    } else {
      stack.push(number);
    }
  });

  return stack.length === 0 ? 0 : stack.reduce((acc, cur) => acc + cur);
}
