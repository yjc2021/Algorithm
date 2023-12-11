function solution(clothes) {
    
    const hash = new Map();
    clothes.forEach(([value, key]) => {
        
        if(hash.get(key)) {
            hash.set(key, new Set([value, ...hash.get(key)]));
            return;
        }
        hash.set(key, new Set([value]));
    })
    let answer = 1;
    hash.forEach((value, key, map) => {
        answer *= (value.size+1);
    })
    return answer-1;
}