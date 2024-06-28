const path = process.platform === "linux" ? [0, "utf-8"] : ["input.txt"];
const input = require("fs")
  .readFileSync(...path)
  .toString()
  .trim()
  .split("\n");

const s = input[0].split("");

console.log(solution(s));

function solution(s) {
  const adj = Array(2).fill(0);

  let prev = s[0];
  for (const c of s.slice(1)) {
    if (prev !== "" && prev !== c) {
      adj[+prev] += 1;
      prev = c;
    }
  }
  adj[+prev] += 1;
  return adj[0] < adj[1] ? adj[0] : adj[1];
}