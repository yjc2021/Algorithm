const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const n = Number(input[0]);
const cards = input[1].split(' ').map(Number).sort((a,b) => a-b);
const m = Number(input[2]);
const queries = input[3].split(' ').map(Number);

function lowerBound(v) {
  let s = 0;
  let e = n-1;
  while(s <= e) {
    const mid = Math.floor((s+e)/2);
    if(v <= cards[mid]) e = mid - 1;
    else s = mid + 1;
  }
  return e;
}
function upperBound(v) {
  let s = 0;
  let e = n-1;
  while(s <= e) {
    const mid = Math.floor((s+e)/2);
    if(v < cards[mid]) e = mid-1;
    else s = mid + 1;
  }
  return e;
}
function solution(v) {
  return upperBound(v) - lowerBound(v);
}
console.log(queries.map(query => solution(query)).join(' '))
