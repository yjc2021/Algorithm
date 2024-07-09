const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const [n, d, k, c] = input[0].split(" ").map(Number);
const sushi = input.slice(1, 1 + n).map(Number);

console.log(solution(n, d, k, c, sushi));

function solution(...args) {
  const [n, d, k, c, sushi] = args;

  const dic = Array(d + 1).fill(0);
  let cnt = 1;
  let max = 1;
  dic[c] = 1;

  for (let i = 0; i < k; i += 1) {
    if (dic[sushi[i]] === 0) cnt += 1;
    dic[sushi[i]] += 1;
  }

  max = cnt;
  for (let i = 1; i < n; i += 1) {
    const end = (i+k-1)%n;
    dic[sushi[i-1]]-=1;
    if(dic[sushi[i-1]] === 0) cnt -=1;

    dic[sushi[end]] +=1;
    if(dic[sushi[end]] === 1) cnt+=1;
    if(max < cnt) max = cnt;
  }
  return max;
}