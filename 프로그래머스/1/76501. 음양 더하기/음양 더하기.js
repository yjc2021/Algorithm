function solution(absolutes, signs) {
    let sum = 0;
    for(let i = 0; i<absolutes.length;i+=1) {
        const p = signs[i] ? 1 : -1;
        sum+= absolutes[i] * p;
    }
    return sum;
}