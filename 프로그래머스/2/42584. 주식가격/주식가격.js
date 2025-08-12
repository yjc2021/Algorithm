function solution(prices) {
    const n = prices.length;
    const stack = [0];
    const answer = new Array(n).fill(0);
    
    for(let i = 0; i < n; i+=1) {
        while(stack.length && prices[stack[stack.length-1]] > prices[i]) {
            const top = stack.pop();
            answer[top] = i - top;
        }
        stack.push(i);
    }
    
    while(stack.length) {
        const top = stack.pop();
        answer[top] = n-1-top;
    }
    return answer;
}