function solution(r1, r2) {
    let ans = 0;
    
    for(let i =1; i <= r2; i+=1) {
        const maxY = Math.floor(Math.sqrt(r2**2 - i**2));
        const minY = i >=r1 ? 0 : Math.ceil(Math.sqrt(r1**2 - i**2));
        
        ans += (maxY - minY + 1);
    }
    return ans*4;
}