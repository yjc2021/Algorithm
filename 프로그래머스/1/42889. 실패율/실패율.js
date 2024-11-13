function solution(N, stages) {
    const fail = [];
    let num = stages.length;
    for(let i = 1; i <= N; i+=1) {
        const failedNum = stages.filter(v=>v===i).length;
        fail.push([i, failedNum/num]);
        num -= failedNum;
    }
    fail.sort((a,b) => b[1] - a[1]);
    return fail.map(v => v[0])
}