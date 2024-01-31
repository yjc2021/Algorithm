function solution(N, number) {
    const dp = Array.from(Array(9), () => new Set());
    
    if(N === number) return 1;
    
    dp.forEach((set, i) => {
        if(i === 0) return;
        set.add(Number(String(N).repeat(i)));
    })
    
    for(let i = 1; i < 9; i+=1) {
        for(let j = 1; j < i; j+=1) {
            for(let a of dp[j]) {
                for(let b of dp[i-j]) {
                    dp[i].add(a + b);
                    dp[i].add(a - b);
                    dp[i].add(a / b);
                    dp[i].add(a * b);
                }
            }
        }
        if(dp[i].has(number)) return i;
    }
    return -1;
}