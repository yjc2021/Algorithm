function solution(n, k) {
    const str = n.toString(k);
    let ans = 0;
    let num = '';
    let pos = [];
    let idx = 0;
    while(idx < str.length) {
        let c = str[idx];
        while(idx < str.length && c !== '0') {
            num += c;
            pos.push(idx++);
            c = str[idx]
        }
        if(isNumValid(num,pos,str)) ans+=1;
        pos = [];
        num = '';
        idx+=1;
    }
    return ans;
}

function isNumValid(n,pos,str) {
    if(!isPrimeNum(n)) return false;
    
    const st = pos[0];
    const end = pos.at(-1);
    
    if(st > 0 && end < str.length-1) return true;
    if(st === 0 && end < str.length-1) return true;
    if(st > 0 && end === str.length-1) return true;
    if(st === 0 && end === str.length-1) return true;
    return false;
}

function isPrimeNum(n) {
    if(Number(n)===1) return false;
    for(let i = 2; i*i<=n; i+=1) {
        if(n%i === 0) return false;
    }
    return true;
}