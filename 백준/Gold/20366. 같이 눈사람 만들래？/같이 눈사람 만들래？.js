const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const n = +input[0];
const snow = input[1].split(" ").map(Number);

console.log(solution(n, snow));

function solution(n, snow) {
  let min = Infinity;
  snow.sort((a, b) => a - b);

  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      let snowMan1 = snow[i] + snow[j];
      let s = 0,
        e = n - 1;

      while (s < e) {
        if (s === i || s === j) {
          s += 1;
          continue;
        }
        if (e === i || e === j) {
          e -= 1;
          continue;
        }

        let snowMan2 = snow[s] + snow[e];
        min = Math.min(min, Math.abs(snowMan1 - snowMan2));

        if (snowMan1 > snowMan2) s += 1;
        else e -= 1;
      }
      if (min === 0) break;
    }
  }
  return min;
}
