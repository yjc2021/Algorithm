const path = process.platform === 'linux' ? [0, 'utf-8'] : ['input.txt'];
const input = require('fs').readFileSync(...path).toString().trim().split('\n');

const [n, start] = input[0].split(' ').map(Number);
const adj = input.slice(1, 1+n).map(line=>line.split(' ').map(Number));
const tmp = [];
for(let i = 0; i < n; i+=1) {
  if(start === i) continue;
  tmp.push(i);
}

function getPermutation(arr, selectNumber) {
  if(selectNumber === 1) return arr.map(e => [e]);
  const results = [];

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index+1)];
    const permutations = getPermutation(rest, selectNumber-1);
    const attached = permutations.map(e => [fixed, ...e]);
    results.push(...attached);
  })
  return results;
}

for(let k = 0; k < n; k+=1) {
  for(let i = 0; i < n; i+=1) {
    for(let j = 0; j < n; j+=1) {
      if(adj[i][j] > adj[i][k] + adj[k][j]) {
        adj[i][j] = adj[i][k] + adj[k][j];
      }
    }
  }
}

let ans = Infinity;
getPermutation(tmp,n-1).forEach(arr => {
  let sum = adj[start][arr[0]];
  for(let i = 1; i < n- 1; i+=1) {
    sum += adj[arr[i-1]][arr[i]];
  }
  ans = Math.min(ans, sum);
})
console.log(ans);