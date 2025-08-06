function solution(arr, divisor) {
    const ret = arr.filter((v) => v % divisor === 0).sort((a,b) => a-b);
    
    return ret.length === 0 ? [-1] : ret;
}