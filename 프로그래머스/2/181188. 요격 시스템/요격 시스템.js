function solution(targets) {
    targets.sort((a,b) => b[0] - a[0]);
    
    let ans = 1;
    let cur = targets[0][0];
    
    const rest = targets.slice(1);
    for(let target of rest) {
        
        const [s, e] = target;
        
        if(e <= cur) {
            cur = s;
            ans+=1;
        }
    }
    return ans;
}