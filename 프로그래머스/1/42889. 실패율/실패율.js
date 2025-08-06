function solution(N, stages) {
    const challengers = new Array(N+2).fill(0);
    for(const stage of stages) {
        challengers[stage] += 1;
    }

    const fail = {};
    let total = stages.length;
    
    for(let i = 1; i <= N; i += 1) {
        fail[i] = challengers[i] / total;
        total -= challengers[i];
    } 
    
    const result = Object.entries(fail).sort((a,b) => b[1] - a[1]);
    
    return result.map((entry) => Number(entry[0]));
}