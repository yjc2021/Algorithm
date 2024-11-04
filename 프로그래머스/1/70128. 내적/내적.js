function solution(a, b) {
    let sum = 0;
    for(let i = 0; i < a.length; i+=1) {
        sum += a[i] * b[i];
    }
    return sum;
}