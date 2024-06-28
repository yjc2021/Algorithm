const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

let t = +input[0];
const answer = [];

let idx = 1;
while (t--) {
  const n = +input[idx];
  const stockPrice = input[idx + 1].split(" ").map(Number);
  answer.push(solution(n, stockPrice));
  idx += 2;
}
console.log(answer.join("\n"));

function solution(n, stockPrice) {
  let maxStock = 0;
  let profit = 0;
  for (let i = n - 1; i >= 0; i -= 1) {
    if (stockPrice[i] > maxStock) {
      maxStock = stockPrice[i];
    } else if (stockPrice[i] < maxStock) {
      profit += maxStock - stockPrice[i];
    }
  }
  return profit;
}
