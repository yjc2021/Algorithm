function solution(n, times) {
    let ans = 0;
    let l = 0;
    let r = times[times.length-1]*n;
    let mid = 0;
    while(l <= r) {
        mid = Math.floor((l+r) / 2);
        let cnt = 0;
        times.forEach(time => {
            cnt += Math.floor(mid/time);
        })
        
        if(cnt >= n) {
            r = mid-1;
        } else {
            l = mid+1;
        }
    }
    console.log(l);
    return l;
}