const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const n = +input[0];

console.log(solution(n));

function solution(n) {
  return n % 2 ? "SK" : "CY";
}
