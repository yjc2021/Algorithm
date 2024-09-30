const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const n = Number(input[0]);
const a = input[1].split(' ').map(Number).sort((a,b) => a-b)
const m = Number(input[2]);
const queries = input[3].split(' ').map(Number);
function search(v) {
  let s = 0;
  let e = n-1;

  while(s <= e) {
    const mid = Math.floor((s+e)/2);

    if(a[mid] < v) s = mid + 1;
    else if (a[mid] > v) e = mid - 1;
    else return 1;
  }
  return 0;
}

console.log(queries.map(query => search(query)).join('\n'));