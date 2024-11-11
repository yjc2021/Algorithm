function solution(msg) {
    const arr = msg.split('');
    const dic = {};
    for(let i = 0; i < 26; i+=1) dic[String.fromCharCode('A'.charCodeAt(0) + i)] = i+1;
    let len = 26;
    
    let cur = 0;
    const ans = [];
    while(cur < msg.length) {
        
        let str = arr[cur];
        let prev = null;
        while(dic[str]) {
            prev = str;
            str += arr[cur+1];
            cur+=1;
        }
        ans.push(dic[prev]);
        dic[str] = len+1;
        len += 1;
    }
    return ans;
}