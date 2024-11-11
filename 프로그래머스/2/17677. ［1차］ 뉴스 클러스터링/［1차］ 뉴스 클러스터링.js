function solution(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    
    const pair1 = [];
    const pair2 = [];
    for(let i = 0; i < str1.length-1; i+=1) {
        if(!isAlphabet(str1[i]) || !isAlphabet(str1[i+1])) continue
        pair1.push(str1[i]+str1[i+1])
    }
    for(let i = 0; i < str2.length-1; i+=1) {
        if(!isAlphabet(str2[i]) || !isAlphabet(str2[i+1])) continue
        pair2.push(str2[i]+str2[i+1])
    }
    
    const map1 = {}, map2 = {};
    for(str of pair1) {
        if(map1[str]) map1[str]+=1;
        else map1[str] = 1;
    }
    for(str of pair2) {
        if(map2[str]) map2[str] +=1;
        else map2[str] = 1;
    }
    
    let union = {};
    let common = {};
    
    for(key of Object.keys(map1)) {
        union[key] = map1[key];
    }
    for(key of Object.keys(map2)) {
        if(union[key] && union[key] >= map2[key]) continue
        union[key] = map2[key];
    }
    
    for(key of Object.keys(map1)) {
        if(map2[key]) {
            common[key] = map2[key] < map1[key] ? map2[key] : map1[key];
        } 
    }
    if(Object.keys(union).length === 0 && Object.keys(common).length === 0) return 65536;
    return Math.floor(Object.values(common).reduce((acc, cur) => acc+cur, 0) / Object.values(union).reduce((acc,cur) => acc+cur, 0) * 65536)
}
    
function isAlphabet(c) {
    return 'a' <= c && c <= 'z'
}