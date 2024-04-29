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
  const [l, c] = input.shift().split(" ").map(Number);
  const letters = input.shift().trim().split(" ");
  console.log(solution(l, c, letters));
});

const solution = (l, c, letters) => {
  const ans = [];
  const vowels = ["a", "e", "i", "o", "u"];
  letters.sort();

  function dfs(str, start) {
    if (str.length === l) {
      let cnt = 0;
      for (let i = 0; i < l; i += 1) {
        if (vowels.includes(str[i])) cnt += 1;
      }
      if (cnt > 0 && l - cnt > 1) ans.push(str);
      return;
    }
    for (let i = start; i < c; i += 1) {
      dfs(str + letters[i], i + 1);
    }
  }

  dfs("", 0);
  return ans.join("\n");
};
