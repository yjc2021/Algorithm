function solution(record) {
    const memberMap = {};
    const answer = [];
    
    function createResultString(cmd, uid) {
        if(cmd === 'Enter') return `${memberMap[uid]}님이 들어왔습니다.`
        else return `${memberMap[uid]}님이 나갔습니다.`
    }

    for(const s of record) {
        const [cmd, uid, nickname] = s.split(' ');
        
        if(cmd === 'Enter') {
            memberMap[uid] = nickname;
            answer.push(['Enter', uid]);
        } else if(cmd === 'Leave') {
            answer.push(['Leave', uid]);
        } else {
            memberMap[uid] = nickname;
        }
    }
    
    return answer.map(([cmd, uid]) => createResultString(cmd, uid))   
}