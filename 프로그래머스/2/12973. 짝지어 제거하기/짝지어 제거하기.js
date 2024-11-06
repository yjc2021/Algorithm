function solution(s)
{
    const st = [s[0]];
    
    for(let i = 1; i<s.length; i+=1) {
        if(st.length === 0) {
            st.push(s[i]);
            continue;
        }
        const top = st.pop();
        if(s[i] === top) continue;
        st.push(top);
        st.push(s[i]);
    }
    return st.length === 0 ? 1 : 0;
}