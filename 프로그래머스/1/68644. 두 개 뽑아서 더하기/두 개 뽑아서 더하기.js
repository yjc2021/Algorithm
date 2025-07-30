function solution(numbers) {
   const sumList = [];
    for(let i = 0; i < numbers.length; i+=1) {
        for(let j = i+1; j < numbers.length; j+=1) {
            sumList.push(numbers[i] + numbers[j]);
        }
    }
    return [...new Set(sumList)].sort((a,b) => a-b)
}