function solution(n) {
    for(let i = 2; i <= n;i+=1)
        if((n-1)%i === 0) return i;
}