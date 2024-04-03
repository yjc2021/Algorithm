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
  const [n, m, l] = input.shift().split(" ").map(Number);
  const posts = input.shift().split(" ").map(Number);
  if (posts[0] === 0) posts.pop();
  console.log(solution(n, m, l, posts));
});

const solution = (n, m, l, posts) => {
  const road = [];
  road.push(0);
  road.push(l);
  posts.forEach((post) => road.push(post));
  road.sort((a, b) => a - b);

  let left = 1;
  let right = l - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    let count = 0;
    for (let i = 1; i < road.length; i += 1) {
      count += Math.floor((road[i] - road[i - 1] - 1) / mid);
    }
    if (count > m) left = mid + 1;
    else right = mid - 1;
  }

  return left;
};
