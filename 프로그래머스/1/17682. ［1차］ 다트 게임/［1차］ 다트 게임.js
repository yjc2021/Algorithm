function solution(dartResult) {
    let tmp = null;
    const ans = []
    const bonusMap = new Map([['S', 1], ['D', 2], ['T', 3]])
    dartResult.split('').forEach((c, idx, arr) => {
        if(isNumber(c)) {
            if(idx > 0 && isNumber(arr[idx-1])) tmp = Number(`${arr[idx-1]}${c}`)
            else {
                if(tmp !== null) ans.push(tmp)
                tmp = Number(c)}
        }
        else if (isBonus(c)) {
            tmp = Math.pow(tmp, bonusMap.get(c))
        }
        else if (isOption(c)) {
            if(c === '*') {
                if(ans.length > 0) {
                    const prev = ans.pop()
                    ans.push(prev*2)
                }
                ans.push(tmp*2)
            } else {
                ans.push(tmp*(-1))
            }
            
            tmp = null;
        }
    })
    if(tmp !== null) ans.push(tmp)
    
    return ans.reduce((acc,cur) => acc+cur, 0)
}

function isNumber(c) {
    return c >= '0' && c <= '9'
}
function isBonus(c) {
    return c === 'S' || c === 'D' || c === 'T'
}
function isOption(c) {
    return c === '*' || c == '#'
}