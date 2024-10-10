const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const t = Number(input[0]);

let cnt = 1;
for(let i = 0; i < t; i+=1) {
  const [n,m] = input[cnt].split(' ').map(Number);
  const edges = input.slice(cnt+1, cnt+1+m).map(line=>line.split(' ').map(Number));

  console.log(n-1);
  cnt += m+1;
}