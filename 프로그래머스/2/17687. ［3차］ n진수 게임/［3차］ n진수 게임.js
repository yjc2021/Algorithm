function solution(n, t, m, p) {
    let str = '';
    
    for(let i = 0; i < t*m; i+=1) {
        str += i.toString(n).toUpperCase();
    }
    
    let ans = '';
    let cnt = 0;
    
    while(ans.length < t) {
        const s = str.substring(cnt, cnt+m);
        ans += s[p-1];
        cnt += m;
    }
    
    return ans;
}