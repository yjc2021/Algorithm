const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

function binSearch(arr, num) {
  let s = 0;
  let e = arr.length - 1;

  while (s <= e) {
    const mid = Math.floor((s + e) / 2);
    if (arr[mid] < num) s = mid + 1;
    else if (arr[mid] > num) e = mid - 1;
    else if (arr[mid] === num) return 1;
  }
  return -1;
}

const [nA, nB] = input[0].split(" ").map(Number);
const a = input[1].split(" ").map(Number);
const b = input[2].split(" ").map(Number);

console.log(solution(a, b));

function solution(a, b) {
  b.sort((a, b) => a - b);

  const ans = [];
  for (let i = 0; i < a.length; i += 1) {
    if (binSearch(b, a[i]) !== 1) {
      ans.push(a[i]);
    }
  }
  ans.sort((a, b) => a - b);

  if (ans.length !== 0) {
    return [ans.length, ...ans].join(" ");
  } else return 0;
}
