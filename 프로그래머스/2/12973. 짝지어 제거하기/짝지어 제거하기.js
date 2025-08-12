function solution(s) {
    const n = s.length;
    const stack = [];
    
    for(const c of s) {
        if(stack.length === 0) stack.push(c);
        else {
            const top = stack[stack.length-1];
            if(top === c) {
                stack.pop();
            } else {
                stack.push(c);
            }
        }
    }
    return stack.length ? 0 : 1;
}