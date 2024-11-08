function solution(s) {
    s = s.slice(1,s.length-1);
    const a = [];
    let start = 0;
    for(let i = 0; i < s.length; i+=1) {
        if(s[i] === '}') {
            a.push(s.slice(start,i).split(',').map(Number))
        } else if (s[i] === '{') {
            start = i+1;
        }
    }
    
    a.sort((a,b) => a.length - b.length)
    
    const map = new Map();
    const len = a.length;
    const ans = Array(len).fill(0);
    
    for(let i = 0; i < len; i+=1) {
        const arr = a[i];
        for(c of arr) {
            if(!map.has(c)) {
                ans[i] = c;
                map.set(c,true)
                break;
            }
        }
    }
    return ans;
}