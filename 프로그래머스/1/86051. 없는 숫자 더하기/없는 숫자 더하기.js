function solution(numbers) {
    let sum = 45;
    return sum - numbers.reduce((acc, cur) => acc+cur, 0)
}