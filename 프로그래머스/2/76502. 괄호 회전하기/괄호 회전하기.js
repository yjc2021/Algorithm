function solution(s) {
    const arr = s.split('');
    const len = arr.length;
    let ans = 0;
    for(let i = 0; i<len-1; i+=1) {
        if(isCorrect(arr)) ans+=1;
        shiftLeft(arr);
    }
    return ans;
}
function isCorrect(s) {
    st = [];
    for(c of s) {
        if(st.length === 0) {st.push(c); continue;}
        const top = st.pop();
        if((top === '(' && c === ')') || (top === '{' && c === '}') || (top === '[' && c===']')) continue;
        st.push(top);
        st.push(c);
    }
    return st.length ? false : true;
}

function shiftLeft(s) {
    const tmp = s[0];
    for(let i = 0; i < s.length-1;i+=1) {
        s[i] = s[i+1];
    }
    s[s.length-1] = tmp;
}