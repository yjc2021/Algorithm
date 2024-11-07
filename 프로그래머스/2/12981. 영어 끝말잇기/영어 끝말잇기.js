function solution(n, words) {
    const wordMap = {};
    const cnts = Array(n+1).fill(0);
    
    let idx = 2;
    let pivot = words[0].at(-1);
    wordMap[words[0]] = true;
    cnts[1] = 1;
    for(c of words.slice(1)) {
        cnts[idx] += 1;
        if(wordMap[c] || c[0] !== pivot) {
            return [idx, cnts[idx]];
        } 
        wordMap[c] = true;
        pivot = c.at(-1);
        if(idx === n) idx = 1;
        else idx += 1;
    }
    return [0, 0]
}