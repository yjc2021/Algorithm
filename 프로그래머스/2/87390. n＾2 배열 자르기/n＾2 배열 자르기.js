function solution(n, left, right) {
    const arr = [];
    for(let i = left; i <=right; i+=1) {
        const [x,y] = [Math.floor(i/n), i%n]
        arr.push(x > y ? x+1 : y+1)
    }
    return arr
}