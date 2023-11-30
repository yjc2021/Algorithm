const dest = process.execArgv.includes("--stack-size=65536") ? 'dev/stdin' : 'input.txt';
const input = require('fs').readFileSync(dest).toString().split('');

const stack = [];
let res = "";

input.forEach(ch => {
  if(ch >= "A" && ch <= "Z") res+=ch;
  else {
    if(ch === "(") stack.push(ch);
    else if (ch === ")") {
      while(stack[stack.length-1] !== "(") {
        res+=stack.pop();
      }
      stack.pop();
    }
    else if (ch === "+" || ch === "-") {
      while(stack[stack.length-1] !== "(" && stack.length !== 0) {
        res += stack.pop();
      }
      stack.push(ch);
    } 
    else if(ch==="*" || ch === "/") {
      while(stack[stack.length-1] === "*" || stack[stack.length-1] === "/") {
        res+=stack.pop();
      }
      stack.push(ch);
    }
  }
});

while(stack.length) {
  res+=stack.pop();
}

console.log(res);

