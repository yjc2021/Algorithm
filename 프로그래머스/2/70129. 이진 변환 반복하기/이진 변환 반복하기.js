function solution(s) {
    const ans = [0,0];
    let t = s;
    while(true) {
        const [n, tmp] = binary(t);
        ans[0] += tmp[0];
        ans[1] += tmp[1];
        if(n==='1') break;
        t = n;
    }
    return ans;
}

function binary(s) {
    let ans = [0,0];
    let parsed='';
    for(c of s) {
        if(c==='0') {
            ans[1]+=1;
            continue;
        }
        parsed+=c;
    }
    let num = parsed.length;
    let tmp = [];
    while(num > 0) {
        tmp.push(num%2);
        num = Math.floor(num/2);
    }
    ans[0]+=1;
    return [(tmp.reverse().join('')), ans]
}