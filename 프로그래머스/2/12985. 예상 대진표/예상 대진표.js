function solution(n,a,b)
{
    const mid = Math.floor(n/2);
    if(a <= mid && b <= mid) return solution(mid, a, b)
    if(a > mid && b > mid) return solution(mid, a-mid, b-mid);
    
    return Math.log2(n);
}