function solution(n)
{
    let ans = 1;
    while(n > 1) {
        if(Number.isInteger(n/2)) n/=2;
        else {
            ans+=1;
            n-=1;
        }
    }
    return ans;

}