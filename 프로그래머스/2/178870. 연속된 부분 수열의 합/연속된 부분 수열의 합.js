function solution(sequence, k) {
    let minLen = Infinity;
    let s = 0, e = 0;
    const seqLen = sequence.length;
    let sum = sequence[0];
    let ans = [0,0];
    while(s <= e) {
        if(e >= seqLen) break;
        
        if(sum < k) {
            e+=1;
            sum += sequence[e];
        } else {
            if(sum === k && minLen > e-s+1) {
                minLen = e-s+1;
                ans = [s,e];
            } 
            sum -= sequence[s];
            s+=1;
        }
    }
    return ans
}