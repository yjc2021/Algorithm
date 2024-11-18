function solution(record) {
    const nameMap = new Map();
    const parsedRecord = record.map((entry, idx) => {
        const [command, id, name] = entry.split(' ');
        if(command === 'Enter' || command === 'Change') {
            nameMap.set(id, name);
        } 
        return [command, id, name];
    })
    let ans = [];
    for([command, id] of parsedRecord) {
        if(command === 'Change') continue;
        ans.push(createString(command, id, nameMap))
    }
    return ans;
}
function createString(command, id, map) {
    if(command === 'Change') return;
    let str = '';
    str += command === 'Enter' ? ' 들어왔습니다.' : ' 나갔습니다.';
    str = `${map.get(id)}님이` + str;
    return str;
}