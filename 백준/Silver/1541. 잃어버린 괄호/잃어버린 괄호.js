const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const numbers = [];
let ops = [];

let tmp = "";
for (let i = 0; i < input[0].length; i += 1) {
  if (input[0][i] >= "0" && input[0][i] <= "9") {
    tmp += input[0][i];
  } else {
    if (!!tmp) {
      numbers.push(Number(tmp));
      tmp = "";
    }
    ops.push(input[0][i]);
  }
}
if (!!tmp) {
  numbers.push(Number(tmp));
}
ops = ["+", ...ops];

console.log(solution(numbers, ops));

function solution(numbers, ops) {
  let min = 0;
  let isMinus = false;
  for (let i = 0; i < numbers.length; i += 1) {
    if (ops[i] === "+") {
      if (isMinus) {
        min -= numbers[i];
      } else {
        min += numbers[i];
      }
    } else {
      isMinus = true;
      min -= numbers[i];
    }
  }
  return min;
}