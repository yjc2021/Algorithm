const fs = require("node:fs");
const readline = require("readline");
const dest = process.execArgv.includes("--stack-size=65536")
  ? process.stdin
  : fs.createReadStream("input.txt", "utf-8");
const rl = readline.createInterface({
  input: dest,
  output: process.stdout,
});
const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const n = Number(input[0]);
  const arr = input[1].split(" ").map(Number);
  console.log(solution(n, arr));
});

function binSearch(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}
const solution = (n, arr) => {
  const lis = [arr[0]];

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > lis.at(-1)) {
      lis.push(arr[i]);
    } else {
      const index = binSearch(lis, arr[i]);
      lis[index] = arr[i];
    }
  }

  return lis.length;
};
