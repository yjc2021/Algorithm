function solution(s) {
    const n = s.length;
    let ret = 0;
    
    for(let i = 0; i < n; i+=1) {
        const stack = [];
        let isValid = true;
        for(let j = 0; j < n; j+=1) {
            const cur = s[(i+j)%n]
            const top = stack[stack.length - 1];
            if(cur === '[' || cur === '(' || cur === '{') stack.push(cur);
            else {
                if(stack.length === 0) {
                    isValid = false;
                    break;
                }
                else if (top === '[' && cur === ']') stack.pop();
                else if (top === '{' && cur === '}') stack.pop();
                else if (top === '(' && cur === ')') stack.pop();
                else {
                    isValid = false;
                    break;
                }
            }
        }
        if(isValid && stack.length === 0) ret += 1;
    }
    return ret;
}