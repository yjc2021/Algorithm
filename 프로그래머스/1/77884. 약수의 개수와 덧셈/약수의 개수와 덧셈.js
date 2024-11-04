function solution(left, right) {
    let sum = 0;
    for(let i = left; i<=right; i+=1) {
        let add = i;
        if(isCntOdd(i)) add *= -1;
        sum+=add;
    }
    return sum;
}

function isCntOdd(num) {
    let cnt = 0;
    for(let i = 1; i * i <= num; i+=1) {
        if(i*i === num) cnt+=1;
        if(num%i === 0) cnt+=2;
    }
    return cnt%2!==0;
}