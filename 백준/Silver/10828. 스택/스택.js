// 백준 10828 스택
// 실버4
// 2023-11-28

let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

const N = input[0];
const orders = input.slice(1);

const stack = [];
const result = [];
//console.log(orders.length);
orders.forEach((order, idx) => {
  let [keyword, value] = order.split(" ");
  keyword = keyword.trim();
  switch (keyword) {
    case "push":
      stack.push(Number(value));
      break;
    case "pop":
      result.push(stack.pop() || -1);
      break;
    case "size":
      result.push(stack.length);
      break;
    case "empty":
      result.push(stack.length === 0 ? 1 : 0);
      break;
    case "top":
      result.push(stack[stack.length - 1] || -1);
      break;
    default:
      break;
  }
});
console.log(result.join("\n"));
