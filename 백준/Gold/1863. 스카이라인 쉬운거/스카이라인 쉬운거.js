const dest = process.execArgv.includes("--stack-size=65536") ? 'dev/stdin' : 'input.txt';

const input = require('fs').readFileSync(dest).toString().split('\n');

const coords = input.slice(1);

const newCoords = coords.map(coord => {
  const  [x, y] = coord.trim().split(' ');
  return [Number(x), Number(y)];
})
const stack = [];
let res = 0;
newCoords.forEach(([_,y]) => {
  while(stack.length && stack[stack.length-1] > y){ stack.pop(); res+=1;}
  if(!(y)) return;
  if (!stack.length || stack[stack.length-1] < y) {stack.push(y);}
});
while(stack.length) {
  res+=1;
  stack.pop();
}

console.log(res);