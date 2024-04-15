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
  solution(n, arr);
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
  const records = [0];
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > lis.at(-1)) {
      lis.push(arr[i]);
      records.push(lis.length - 1);
    } else {
      const index = binSearch(lis, arr[i]);
      lis[index] = arr[i];
      records.push(index);
    }
  }
  const ans = [];
  let targetIdx = lis.length - 1;
  for (let i = records.length - 1; i >= 0; i -= 1) {
    if (records[i] === targetIdx) {
      ans.push(arr[i]);
      targetIdx -= 1;
      if (targetIdx < 0) break;
    }
  }
  console.log(ans.length);
  console.log(ans.reverse().join(" "));
};