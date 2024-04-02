const [NM, ...input] = require('fs')
  .readFileSync('/dev/stdin')
  .toString()
  .trim()
  .split('\n');
const [N, M] = NM.split(' ').map(Number);
const arr = input.map(Number);

arr.sort((a, b) => a - b);
let minDiff = Infinity;
let start = 0;
let end = 0;

while (start <= end && end < N) {
  const curDiff = Math.abs(arr[start] - arr[end]);
  if (curDiff < M) {
    end++;
  } else {
    minDiff = Math.min(minDiff, curDiff);
    start++;
  }
  if (curDiff === M) {
    break;
  }
}

console.log(minDiff);