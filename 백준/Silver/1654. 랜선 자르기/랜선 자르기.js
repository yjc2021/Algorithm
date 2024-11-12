const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [k,n] = input[0].split(' ').map(Number);
const lens = input.slice(1,1+k).map(Number);

let lo = 1;
let hi = Math.max(...lens);

while(lo <= hi) {
  const mid = Math.floor((lo+hi)/2);
  let sum = lens.reduce((acc,cur) => acc + Math.floor(cur/mid), 0);
  if(sum < n) {
    hi = mid-1;
  } else {
    lo = mid+1;
  }
}

console.log(hi);